"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from '@/app/lib/useAuth';
import { motion, AnimatePresence } from 'framer-motion';

function NavBar() {
  const [navbar, setNavbar] = useState(false);
  const { isAuthenticated, isUnauthenticated, isLoading, logout } = useAuth();
  
  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (navbar) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [navbar]);

  const handleLinkClick = () => {
    setNavbar(false);
  };

  return (
    <header className="bg-surface/90 sticky top-0 z-50 border-b border-outline-variant backdrop-blur-md shadow-md text-xl sm:text-2xl h-[68px]">
      <div className="flex justify-between items-center w-full px-4 md:px-8 py-3 max-w-[1280px] mx-auto h-full">
        {/* Brand/Logo */}
        <Link href="/" className="flex items-center gap-3 select-none" onClick={handleLinkClick}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-on-primary-container shadow-sm">
            <img src="NoteShaala_Logo.png" alt="logo" className='w-10 h-10' />
          </div>
          <span className="font-headline-md text-headline-md font-bold tracking-tight text-on-surface">
            NOTESHAALA
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 h-full">
          {isLoading ? (
            <div className="flex items-center gap-8 animate-pulse">
              <div className="w-16 h-4 bg-outline-variant/30 rounded"></div>
              <div className="w-16 h-4 bg-outline-variant/30 rounded"></div>
              <div className="w-16 h-4 bg-outline-variant/30 rounded"></div>
              <div className="w-20 h-10 bg-outline-variant/30 rounded-lg"></div>
            </div>
          ) : (
            <>
              {isAuthenticated && (
                <>
                  <Link 
                    className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-label-md text-label-md flex items-center gap-2" 
                    href="/#notes"
                  >
                    <img src="notes.svg" alt="notes" className='w-5 h-5'/>
                    Notes
                  </Link>
                  <Link 
                    className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-label-md text-label-md flex items-center gap-2" 
                    href="/usernotes"
                  >
                    <img src="user.svg" alt="profile" className='w-5 h-5'/>
                    Profile
                  </Link>
                  <Link 
                    className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-label-md text-label-md flex items-center gap-2" 
                    href="/#reviews"
                  >
                    <img src="smile.svg" alt="reviews" className='w-5 h-5'/>
                    Reviews
                  </Link>
                  <Link 
                    className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-label-md text-label-md flex items-center gap-2" 
                    href="/uploadnotes"
                  >
                    <img src="upload.svg" alt="upload" className='w-5 h-5'/>
                    Upload
                  </Link>
                </>
              )}
              <Link 
                className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-label-md text-label-md flex items-center gap-2" 
                href="/#contacts"
              >
                <img src="arrows.svg" alt="contact" className='w-5 h-5'/>
                Contact
              </Link>

              {/* Desktop Auth Buttons */}
              {isUnauthenticated && (
                <div className="flex items-center gap-4">
                  <Link href="/login" className="text-on-surface-variant hover:text-primary font-label-md text-label-md transition-colors">
                    SignIn
                  </Link>
                  <Link href="/signup" className="bg-primary text-white px-5 py-2 rounded-lg font-label-md text-label-md hover:bg-primary/95 transition-all shadow-sm">
                    SignUp
                  </Link>
                </div>
              )}
              {isAuthenticated && (
                <button onClick={() => logout()} className="bg-primary-container text-on-primary-container px-5 py-2 rounded-lg font-label-md text-label-md hover:opacity-90 transition-all shadow-sm">
                  LogOut
                </button>
              )}
            </>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            className="text-primary p-1 focus:outline-none"
            onClick={() => setNavbar(!navbar)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-2xl font-bold">
              {navbar ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {navbar && (
          <>
            {/* Backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleLinkClick}
              className="fixed inset-0 top-[68px] h-[calc(100vh-68px)] bg-black/40 z-40 md:hidden"
            />
            
            {/* Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed top-[68px] right-0 h-[calc(100vh-68px)] w-[280px] bg-surface z-50 flex flex-col gap-4 px-6 py-6 shadow-[-10px_0_30px_rgba(0,0,0,0.1)] md:hidden overflow-y-auto"
            >
              {isLoading ? (
                <div className="flex flex-col gap-6 animate-pulse mt-4">
                  <div className="h-4 bg-outline-variant/30 rounded w-2/3"></div>
                  <div className="h-4 bg-outline-variant/30 rounded w-1/2"></div>
                  <div className="h-4 bg-outline-variant/30 rounded w-3/4"></div>
                  <div className="h-10 bg-outline-variant/30 rounded-lg w-full mt-4"></div>
                </div>
              ) : (
                <>
                  {isAuthenticated && (
                    <>
                      <Link 
                        className="text-on-surface-variant hover:text-primary transition-colors py-2 font-label-md text-label-md flex items-center gap-3" 
                        href="/#notes" 
                        onClick={handleLinkClick}
                      >
                        <img src="notes.svg" alt="notes" className='w-5 h-5'/>
                        Notes
                      </Link>
                      <Link 
                        className="text-on-surface-variant hover:text-primary transition-colors py-2 font-label-md text-label-md flex items-center gap-3" 
                        href="/usernotes" 
                        onClick={handleLinkClick}
                      >
                        <img src="user.svg" alt="profile" className='w-5 h-5'/>
                        Profile
                      </Link>
                      <Link 
                        className="text-on-surface-variant hover:text-primary transition-colors py-2 font-label-md text-label-md flex items-center gap-3" 
                        href="/#reviews" 
                        onClick={handleLinkClick}
                      >
                        <img src="smile.svg" alt="reviews" className='w-5 h-5'/>
                        Reviews
                      </Link>
                      <Link 
                        className="text-on-surface-variant hover:text-primary transition-colors py-2 font-label-md text-label-md flex items-center gap-3" 
                        href="/uploadnotes" 
                        onClick={handleLinkClick}
                      >
                        <img src="upload.svg" alt="upload" className='w-5 h-5'/>
                        Upload
                      </Link>
                    </>
                  )}
                  <Link 
                    className="text-on-surface-variant hover:text-primary transition-colors py-2 font-label-md text-label-md flex items-center gap-3" 
                    href="/#contacts" 
                    onClick={handleLinkClick}
                  >
                    <img src="arrows.svg" alt="contact" className='w-5 h-5'/>
                    Contact
                  </Link>

                  {/* Mobile Auth Buttons */}
                  {isUnauthenticated && (
                    <div className="flex flex-col gap-3 pt-4 mt-2 border-t border-outline-variant/50">
                      <Link href="/login" onClick={handleLinkClick} className="text-center text-on-surface-variant hover:text-primary font-label-md text-label-md py-2 transition-colors">
                        SignIn
                      </Link>
                      <Link href="/signup" onClick={handleLinkClick} className="text-center bg-primary text-white py-3 rounded-lg font-label-md text-label-md hover:bg-primary/95 transition-all shadow-sm">
                        SignUp
                      </Link>
                    </div>
                  )}
                  {isAuthenticated && (
                    <div className="pt-4 mt-2 border-t border-outline-variant/50">
                      <button onClick={() => { logout(); handleLinkClick(); }} className="w-full block text-center bg-primary-container text-on-primary-container py-3 rounded-lg font-label-md text-label-md hover:opacity-90 transition-all shadow-sm">
                        LogOut
                      </button>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

export default NavBar;
