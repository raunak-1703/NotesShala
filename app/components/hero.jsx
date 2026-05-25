"use client"
import React from 'react';
import { motion } from 'framer-motion'
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useAuth } from "@/app/lib/useAuth";
const variants = {
  initial: {
    y: -200,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  },
}

const HeroSection = () => {
  const { user, isAuthenticated, isUnauthenticated, isLoading } = useAuth();
  return (
    <div className="slide-container bg-center" >
      <div  style={{
        backgroundImage: "url(/Mobile_Hero.png)",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        backgroundPosition:'center',
        backgroundRepeat: 'no-repeat',
        // background: 'linear-gradient(to bottom, rgba(2, 2, 2, 0.633),rgba(2, 2, 2, 0.633))',
      }} className='h-[130vw] sm:h-[90vh]'>
         <div className='w-full h-full sm:bg-[url(/Hero.png)] sm:bg-cover sm:bg-center sm:bg-no-repeat flex items-center justify-center'>
        <div className='flex flex-col justify-start items-center h-full w-full' style={{
          // background: 'linear-gradient(to bottom, rgba(2, 2, 2, 0.533), rgba(2, 2, 2, 0.533))'
        }}>
          <motion.div className='flex text-black items-center justify-center pt-28 md:pt-36'
            variants={variants}
            initial='initial'
            whileInView='animate'
          >
            <div className='flex flex-col items-center justify-center '>
              <motion.h3 className='text-xl sm:text-3xl font-medium' variants={variants}>WELCOME TO NOTESHAALA</motion.h3>
              <motion.h2 className='text-4xl sm:text-7xl font-semibold my-6 sm:my-10' variants={variants}>GET FREE NOTES</motion.h2>
              <motion.p className='px-12 md:px-0 md:w-3/5 text-center sm:mb-10 mb-1 sm:text-lg' variants={variants}>
              Your digital companion for academic excellence. Get ready to revolutionize your study experience!
              </motion.p>
              <motion.p className='px-5 md:px-0 md:w-3/5 text-center sm:mb-10 mb-1 sm:text-lg' variants={variants}>
              #share_notes #share_knowledge
              </motion.p>
              {isAuthenticated && (
                <motion.button className='bg-[#29b5f6d5] hover:bg-[#29b5f686] hover:scale-[1.02]  sm:w-40 p-2 py-1 sm:py-2 mt-5 rounded-md' variants={variants} >Hello, {user?.given_name}</motion.button>
              )}
              {isLoading && (
                <motion.button className='bg-[#29b5f6d5] opacity-70 sm:w-40 p-2 py-1 sm:py-2 mt-5 rounded-md' variants={variants} >Loading...</motion.button>
              )}
              {isUnauthenticated && (
                <motion.button className='bg-[#29b5f6d5] hover:bg-[#29b5f686] hover:scale-[1.02]  sm:w-40 p-2 py-1 sm:py-2 mt-5 rounded-md' variants={variants} ><RegisterLink>Sign up</RegisterLink></motion.button>
              )}
             </div>
          </motion.div>
        </div>
        </div>
      </div>

    </div>
  )
}

export default HeroSection
