"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import axios from "axios";
import useShowToast from '@/hooks/useShowToast'
import { apiUrl } from "@/app/lib/api";
import { useAuth } from "@/app/lib/useAuth";

const TestimonialCarousel = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const { isAuthenticated, isUnauthenticated, isLoading } = useAuth();
  const showToast = useShowToast();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(apiUrl('/api/testimonials'));
        setUsers(response.data.testimonials);
        // console.log(response);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch testimonials.');
      }
    };

    fetchUsers();
  }, []);



  return (
    <main className="flex mb-10 flex-col items-center mt-12 overflow-x-hidden">
      <h1 className="mb-8 text-3xl px-2 text-center font-bold">OUR HAPPY STUDENTS</h1>

      {error && <div className="text-red-500">{error}</div>}

      <Carousel
        plugins={[Autoplay({ delay: 1500 })]}
        opts={{
          align: "start",
        }}
        className="w-[70%]"
      >
        <CarouselContent>
          {Array.isArray(users) && users.map((data, index) => (

            <CarouselItem key={index} className="sm:basis-1/1 md:basis-1/3 lg:basis-1/4">

              <div className=" w-[100%] h-[50vh] rounded-[0.8rem] scale-95 bg-gradient-to-r from-[#29b5f6] to-[#67c5f1d5] border-gray-200 border-[2px] shadow-md transition-all duration-300 hover:scale-100">
                <div className="flex w-[96%] flex-col h-[48vh] m-auto mt-1 rounded-[0.8rem] items-center justify-center border-white p-3 border-[2px]">
                  <span className="border-[2px] border-gray-200 p-1 rounded-full">
                    <img
                      className="aspect-square rounded-full w-[8rem] border-[2px] "
                      src={data?.picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                      alt="picture"
                    />
                  </span>
                  <span className="text-xl  p-2 text-black">{data?.fullname}</span>
                  <span className="text-lg text-center p-4 text-gray-800">"{data?.message}"</span>
                </div>
              </div>
            </CarouselItem>

          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {isAuthenticated ? (<Link href="/userTestimonial">
        <button className="mt-12 border-white border-[2px] rounded-lg px-7 py-2 text-lg bg-[#29b5f6d5] hover:bg-[#29b5f686] hover:scale-[1.02]">
          Drop your experience
        </button>
      </Link>) : isLoading ? (
          <button className="mt-12 border-white border-[2px] rounded-lg px-7 py-2 text-lg bg-[#29b5f6d5] opacity-70">
            Checking session...
          </button>
        ) : isUnauthenticated && (
          <div>
            <button onClick={() => showToast('Error','Not Authorised Please Login !','error')} className="mt-12 border-white border-[2px] rounded-lg px-7 py-2 text-lg bg-[#29b5f6d5] hover:bg-[#29b5f686] hover:scale-[1.02]">
              Drop your experience
            </button>
          </div>
        )}
    </main>
  );
};

export default TestimonialCarousel;
