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
        // Show only top 10 newly added (assuming the API sorts them, but we slice to 10)
        let fetchedUsers = Array.isArray(response.data.testimonials) ? response.data.testimonials : [];
        setUsers(fetchedUsers.slice(0, 10));
      } catch (err) {
        console.error(err);
        setError('Failed to fetch testimonials.');
      }
    };

    fetchUsers();
  }, []);

  return (
    <section className="bg-surface-bright py-16 md:py-24 border-t border-b border-outline-variant overflow-hidden text-[#191c1e]">
      <div className="max-w-[1280px] mx-auto px-8">
        
        {/* Testimonials Content */}
        {users.length > 0 ? (
          <>
            <div className="text-center mb-16">
              <h2 className="font-headline-xl text-headline-xl italic font-bold tracking-tight">
                OUR HAPPY STUDENTS
              </h2>
              <div className="w-24 h-1 bg-[#00adef] mx-auto mt-4 rounded-full"></div>
            </div>

            {/* Carousel Container */}
            <div className="relative group px-4">
              <Carousel
                plugins={[Autoplay({ delay: 2500 })]}
                opts={{
                  align: "start",
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {users.map((data, index) => (
                    <CarouselItem key={index} className="pl-4 sm:basis-1/1 md:basis-1/2 lg:basis-1/3">
                      <div className="bg-white p-8 rounded-2xl border border-outline-variant shadow-[0_4px_20px_rgba(0,173,239,0.06)] h-[320px] flex flex-col justify-between hover:scale-[1.01] transition-all duration-300">
                        
                        {/* Student Info Header */}
                        <div className="flex items-center gap-4 mb-4">
                          <img
                            className="w-12 h-12 rounded-full border-2 border-transparent object-cover bg-[#f2f4f6]"
                            src={data?.picture || "/user.svg"}
                            alt="Student profile"
                            onError={(e) => { e.target.src = '/user.svg'; }}
                          />
                          <div className="min-w-0 flex-grow">
                            <h4 className="font-label-lg text-label-lg font-bold text-[#191c1e] truncate">
                              {data?.fullname}
                            </h4>
                            <p className="font-body-sm text-body-sm text-[#576065] mt-0.5">
                              Verified Student
                            </p>
                          </div>
                        </div>

                        {/* Stars */}
                        <div className="flex text-[#00658d] select-none mb-4 gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                          ))}
                        </div>

                        {/* Testimonial Quote */}
                        <div className="overflow-y-auto no-scrollbar flex-grow">
                          <p className="text-[#576065] font-body-lg text-[16px] italic leading-relaxed">
                            "{data?.message}"
                          </p>
                        </div>

                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {users.length > 1 && (
                  <div className="hidden md:block">
                    <CarouselPrevious className="absolute left-[-16px] md:left-[-32px] top-1/2 -translate-y-1/2 z-20 bg-white border border-[#bdc8d1] shadow-md hover:bg-[#c6e7ff]/30 text-primary w-11 h-11" />
                    <CarouselNext className="absolute right-[-16px] md:right-[-32px] top-1/2 -translate-y-1/2 z-20 bg-white border border-[#bdc8d1] shadow-md hover:bg-[#c6e7ff]/30 text-primary w-11 h-11" />
                  </div>
                )}
                {users.length > 1 && (
                  <div className="block md:hidden">
                    <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white border border-[#bdc8d1] shadow-md hover:bg-[#c6e7ff]/30 text-primary w-11 h-11" />
                    <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white border border-[#bdc8d1] shadow-md hover:bg-[#c6e7ff]/30 text-primary w-11 h-11" />
                  </div>
                )}
              </Carousel>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <h2 className="font-headline-md text-headline-md font-semibold text-[#576065]">
              Be the first to share your experience!
            </h2>
          </div>
        )}

        {/* CTA Drop Experience Button */}
        <div className={`text-center ${users.length > 0 ? 'mt-12' : 'mt-4'}`}>
          {isAuthenticated ? (
            <Link href="/userTestimonial">
              <button className="inline-flex items-center gap-2 bg-[#00adef] text-white px-8 py-3 rounded-lg font-label-md text-label-md hover:opacity-90 active:scale-95 transition-all shadow-sm">
                Drop your experience
                <span className="material-symbols-outlined text-[18px]">edit</span>
              </button>
            </Link>
          ) : isLoading ? (
            <button className="inline-flex items-center gap-2 bg-[#00adef] text-white px-8 py-3 rounded-lg font-label-md text-label-md opacity-70 cursor-wait">
              Checking session...
            </button>
          ) : isUnauthenticated && (
            <button 
              onClick={() => showToast('Error', 'Not Authorized, Please Login!', 'error')} 
              className="inline-flex items-center gap-2 bg-[#00adef] text-white px-8 py-3 rounded-lg font-label-md text-label-md hover:opacity-90 active:scale-95 transition-all shadow-sm"
            >
              Drop your experience
              <span className="material-symbols-outlined text-[18px]">edit</span>
            </button>
          )}
        </div>

      </div>
    </section>
  );
};

export default TestimonialCarousel;
