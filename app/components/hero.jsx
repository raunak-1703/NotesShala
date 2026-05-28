"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useAuth } from "@/app/lib/useAuth";
import { apiUrl } from "@/app/lib/api";

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  initial: { y: 30, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const HeroSection = () => {
  const { isAuthenticated, isUnauthenticated, isLoading } = useAuth();
  const [stats, setStats] = React.useState({ activeUsers: 0, notesShared: 0 });
  const [statsLoading, setStatsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(apiUrl('/api/notes/stats'));
        if (res.ok) {
          const data = await res.json();
          setStats({
            activeUsers: data.activeUsers || 0,
            notesShared: data.notesShared || 0
          });
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setStatsLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-center pt-20 pb-16 overflow-hidden academic-pattern bg-[#fcf9f8]">
      <div className="max-w-[1280px] mx-auto w-full px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left text column */}
        <motion.div 
          className="space-y-6 z-10 flex flex-col items-start justify-center text-[#191c1e]"
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#c6e7ff] text-[#001e2e] rounded-full text-label-sm font-label-sm font-semibold shadow-sm select-none"
            variants={itemVariants}
          >
            <span className="material-symbols-outlined text-[18px]">verified</span>
            WELCOME TO NOTESHAALA
          </motion.div>


          {/* Subtext */}
          <motion.p 
            className="text-body-lg text-[#3e4850] max-w-lg leading-relaxed"
            variants={itemVariants}
          >
            Your digital companion for academic excellence. Access premium resources, share knowledge, and revolutionize your study experience today.
          </motion.p>

          {/* Buttons */}
          <motion.div 
            className="flex flex-wrap gap-4 pt-2"
            variants={itemVariants}
          >
            {isAuthenticated && (
              <a 
                href="#notes" 
                className="bg-[#00658d] text-white px-8 py-3 rounded-lg font-label-md text-label-md flex items-center gap-2 hover:bg-[#00658d]/95 transition-all shadow-lg shadow-[#00658d]/20 active:scale-95"
              >
                <span className="material-symbols-outlined text-[20px]">search</span>
                Browse Notes
              </a>
            )}
            {isLoading && (
              <button 
                className="bg-[#00658d] text-white px-8 py-3 rounded-lg font-label-md text-label-md opacity-70 flex items-center gap-2 cursor-wait"
                disabled
              >
                Checking session...
              </button>
            )}
            {isUnauthenticated && (
              <RegisterLink className="bg-[#00658d] text-white px-8 py-3 rounded-lg font-label-md text-label-md flex items-center gap-2 hover:bg-[#00658d]/95 transition-all shadow-lg shadow-[#00658d]/20 active:scale-95">
                <span className="material-symbols-outlined text-[20px]">person_add</span>
                Sign Up
              </RegisterLink>
            )}

            <a 
              href="#contacts" 
              className="border border-[#00658d] text-[#00658d] px-8 py-3 rounded-lg font-label-md text-label-md flex items-center gap-2 hover:bg-[#c6e7ff]/30 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">mail</span>
              Contact Team
            </a>
          </motion.div>

          {/* Stats strip */}
          {!statsLoading && (stats.activeUsers > 0 || stats.notesShared > 0) && (
            <motion.div 
              className="flex gap-10 pt-6 border-t border-[#bdc8d1]/40 w-full"
              variants={itemVariants}
            >
              <div>
                <div className="font-headline-md text-headline-md font-bold text-[#00658d]">
                  {stats.activeUsers}
                </div>
                <div className="text-label-sm text-[#576065] uppercase tracking-wider font-semibold">Active Users</div>
              </div>
              <div>
                <div className="font-headline-md text-headline-md font-bold text-[#00658d]">
                  {stats.notesShared}
                </div>
                <div className="text-label-sm text-[#576065] uppercase tracking-wider font-semibold">Notes Shared</div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Right graphic column */}
        <motion.div 
          className="relative flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-full aspect-square max-w-[460px]">
            {/* Background decorative glow */}
            <div className="absolute inset-0 bg-[#83cfff]/15 rounded-full blur-3xl"></div>
            
            <img 
              alt="Student studying with notes" 
              className="relative z-10 w-full h-full object-cover rounded-3xl shadow-xl border-4 border-white" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCV1BwnGp_HmMwEzo5gXVCZHlHgkXds_8E_To8OeqoOBdykasVrvScahhFAH6h6u5TJpWJ7jaGODimQOoWMQcEkP5frmlBmDBssn9e6BerOOm7TkbDpR-dVGsT3VFLjiJJi0eCDkphADBrBngXMIjY8EAAwIpSYRZZRaZpckCzFLXC2Da6yIxaYzkTbaoaiUh0110K1WV44poqkzmuyhrWo2frrPR2BzMcYl_fcKlw8Z6Zt1eKKb6YquEJUg80gVZWlnqfqo7gd01uD"
            />
          </div>
        </motion.div>
      </div>

      {/* Dotted Anchor Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full opacity-10 pointer-events-none overflow-hidden h-24 flex items-end select-none">
        <div className="flex gap-10 text-[#00658d] px-8">
          <span className="material-symbols-outlined text-[80px]">book_2</span>
          <span className="material-symbols-outlined text-[70px]">edit_note</span>
          <span className="material-symbols-outlined text-[90px]">menu_book</span>
          <span className="material-symbols-outlined text-[80px]">library_books</span>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
