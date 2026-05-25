"use client"
import React, { useState } from 'react'
import Link from 'next/link';
import { HiOutlineMail, HiOutlinePhone } from 'react-icons/hi';
import useShowToast from '@/hooks/useShowToast'
import { useAuth } from '@/app/lib/useAuth'

const Contact = () => {
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')

    const {isAuthenticated, isUnauthenticated, isLoading} = useAuth();
    const showToast = useShowToast(); 

    // const handleclick = () => {
    //     if(!name || !message){
    //         showToast("Error", "All feild must be filled", 'error')
    //     }
    //     else{
    //         showToast('Success', 'Thank you! Your form is submitted', 'success')
    //         setName('');
    //         setMessage('');
    //     }
    // }
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (name == '' || message == '') {
            showToast("error", "Please fill all the credentials!")
            return;
        }

        const formData = new FormData();
        formData.append("name",name)
        formData.append("message",message)
    
        formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY);
    
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });
    
        const data = await response.json();
    
        if (data.success) {
            showToast("success", "message sent successfully");
            setName('');
            setMessage('');
        } else {
          console.log("Error", data);
          showToast("error", data.message);
        }
    };
    return (
        <div>
            <div className='flex md:justify-evenly justify-center md:flex-row flex-col items-center px-4 py-4'>
                {/* Left side */}
                <div className='flex flex-col justify-center items-center'>
                    <p className="md:text-5xl text-3xl font-bold text-black md:mb-12 mb-5 md:ml-8">CONTACT</p>
                    {/* Email icon */}
                    <div className="flex items-center mt-2 md:ml-8">
                        <HiOutlineMail className="mr-2" size={20} />
                        <span>Email: teaminnoreva@nitjsr.ac.in</span>
                    </div>
                    {/* Phone icon */}
                    <div className="flex items-center mt-2 md:ml-8">
                        <HiOutlinePhone className="mr-2" size={20} />
                        <span>Phone: +91 7004632130</span>
                    </div>
                    <div className="flex items-center mt-2 md:ml-8">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
</svg>
                        <span className='hover:underline hover:cursor-pointer hover:text-[gray]'><Link href="/members">Designed and Developed by &rarr;
                        </Link> </span>
                        
                    </div>
                    <span className='flex items-center mt-6 w-28'><img src="/innoreva_logo.png" alt="" /></span>
                </div>
                {/* Right side */}
                <div className="bg-lightblue rounded-lg p-4 mt-7 md:mt-0">
                    <div className="bg-dark-blue rounded-lg p-4 lg:py-10">
                        <h3 className="text-xl mb-2 text-white">Share Your Experience With Us!</h3>
                        <div className="p-4 bg-dark-blue rounded-lg">
                            <input type="text" className="w-full p-2 mb-2 border border-blue-500 rounded-lg bg-light-blue" placeholder="Your Name" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <textarea className="w-full p-2 border border-blue-500 rounded-lg bg-light-blue" rows="4" placeholder="Your Review"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>
                        </div>
                        <div className='flex justify-center items-center'>
                            {isAuthenticated ? (<div onClick={handleSubmit} className='border cursor-pointer w-32 border-blue-500 rounded-lg bg-light-blue p-2 text-center hover:scale-[1.02]'>
                                Submit
                            </div>) : isLoading ? (
                            <div className='border w-32 border-blue-500 rounded-lg bg-light-blue p-2 text-center opacity-70'>
                                Checking...
                            </div>) : isUnauthenticated && (
                            <div onClick={() => showToast('Error','Not Authorised Please Login !','error')} className='border cursor-pointer w-32 border-blue-500 rounded-lg bg-light-blue p-2 text-center hover:scale-[1.02]'>
                                Submit
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
