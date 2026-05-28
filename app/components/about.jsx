"use client";

import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white overflow-hidden text-[#191c1e]">
      <div className="max-w-[1280px] mx-auto px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <div className="text-[#00658d] font-headline-sm text-headline-sm uppercase tracking-wider font-semibold">
            About Us
          </div>
          <h2 className="font-headline-xl text-headline-xl italic font-bold">
            What we do
          </h2>
          <div className="flex justify-center items-center mt-3">
            <div className="w-12 h-1 bg-[#00adef] rounded-l-full"></div>
            <div className="w-24 h-1 bg-[#00658d]"></div>
            <div className="w-12 h-1 bg-[#00adef] rounded-r-full"></div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          
          {/* Left Text details */}
          <motion.div 
            className="relative space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute -top-10 -left-10 w-36 h-36 bg-[#83cfff]/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <h3 className="font-headline-lg text-headline-lg italic font-bold leading-snug">
              We are providing a better notes sharing facility!
            </h3>
            
            <p className="text-body-lg text-[#3e4850] leading-relaxed">
              We believe in transforming academic spaces into captivating collaborative experiences. Our platform bridges the gap between those who excel and those who strive.
            </p>
            
            <ul className="space-y-6 pt-2">
              <li className="flex items-start gap-4">
                <div className="mt-1 bg-[#00adef] text-white p-1 rounded-full flex items-center justify-center shadow-sm select-none">
                  <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                </div>
                <span className="text-body-md text-[#191c1e] font-medium">
                  Everyone in college can upload and view notes, making resources easily accessible.
                </span>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 bg-[#00adef] text-white p-1 rounded-full flex items-center justify-center shadow-sm select-none">
                  <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                </div>
                <span className="text-body-md text-[#191c1e] font-medium">
                  Students can share their notes, promoting collaborative learning and diverse perspectives.
                </span>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 bg-[#00adef] text-white p-1 rounded-full flex items-center justify-center shadow-sm select-none">
                  <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                </div>
                <span className="text-body-md text-[#191c1e] font-medium">
                  The site accommodates different note formats, catering to various learning preferences.
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Right Image Graphic Stack */}
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white p-4 rounded-[2rem] border border-[#bdc8d1] shadow-xl hover:rotate-0 rotate-2 transition-transform duration-500 max-w-[480px] w-full">
              <img 
                alt="Student notes and stationery" 
                className="rounded-[1.5rem] w-full aspect-[4/3] object-cover shadow-sm" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnbUYFzuTyinp7nkSA5rTaa5WvoAtEVOqYPxdrAj8MI8782FIMRrgUU-dF3_q_uler_knHh7es9DtlnFr8MTsUrwm5ZBRaBkJkGMGAS0FT__qVEhGS3EmnTIPOS2JhlnuSxlypgVZdCMTazBq-y4oDq4pVguTW3qbOFrympFOFrBzK_rVeaNidXMuSrnN7dieJAVLOsmPJJywUI2qJBlsAxr-HiAEWyArN0830srTN6Z4uQ9zdY-ssiPDtb80SsZAyZN8SangipnGI"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
