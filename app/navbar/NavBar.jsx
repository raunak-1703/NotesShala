"use client";

import Link from 'next/link';
import { useState } from 'react';
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useAuth } from '@/app/lib/useAuth';

function NavBar() {
  const [navbar, setNavbar] = useState(false);
  const { isAuthenticated, isUnauthenticated, isLoading } = useAuth();

  const handleLinkClick = () => {
    setNavbar(false);
  };

  return (
    <header className="bg-surface/90 sticky top-0 z-50 border-b border-outline-variant backdrop-blur-md shadow-md text-xl sm:text-2xl">
      <div className="flex justify-between items-center w-full px-4 md:px-8 py-3.5 max-w-[1280px] mx-auto">
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
        <nav className="hidden md:flex items-center gap-8">
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
          {!isLoading && isUnauthenticated && (
            <div className="flex items-center gap-4">
              <LoginLink className="text-on-surface-variant hover:text-primary font-label-md text-label-md transition-colors">
                SignIn
              </LoginLink>
              <RegisterLink className="bg-primary text-white px-5 py-2 rounded-lg font-label-md text-label-md hover:bg-primary/95 transition-all shadow-sm">
                SignUp
              </RegisterLink>
            </div>
          )}
          {!isLoading && isAuthenticated && (
            <LogoutLink className="bg-primary-container text-on-primary-container px-5 py-2 rounded-lg font-label-md text-label-md hover:opacity-90 transition-all shadow-sm">
              LogOut
            </LogoutLink>
          )}
          {isLoading && (
            <div className="w-48 h-10"></div>
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

      {/* Mobile Nav Menu */}
      {navbar && (
        <div className="md:hidden border-t border-outline-variant bg-surface px-6 py-4 flex flex-col gap-4 animate-fadeIn">
          {isAuthenticated && (
            <>
              <Link 
                className="text-on-surface-variant hover:text-primary transition-colors py-2 font-label-md text-label-md" 
                href="/#notes" 
                onClick={handleLinkClick}
              >
                Notes
              </Link>
              <Link 
                className="text-on-surface-variant hover:text-primary transition-colors py-2 font-label-md text-label-md" 
                href="/usernotes" 
                onClick={handleLinkClick}
              >
                Profile
              </Link>
              <Link 
                className="text-on-surface-variant hover:text-primary transition-colors py-2 font-label-md text-label-md" 
                href="/#reviews" 
                onClick={handleLinkClick}
              >
                Reviews
              </Link>
              <Link 
                className="text-on-surface-variant hover:text-primary transition-colors py-2 font-label-md text-label-md" 
                href="/uploadnotes" 
                onClick={handleLinkClick}
              >
                Upload
              </Link>
            </>
          )}
          <Link 
            className="text-on-surface-variant hover:text-primary transition-colors py-2 font-label-md text-label-md" 
            href="/#contacts" 
            onClick={handleLinkClick}
          >
            Contact
          </Link>

          {/* Mobile Auth Buttons */}
          {!isLoading && isUnauthenticated && (
            <div className="flex flex-col gap-3 pt-2 border-t border-outline-variant/50">
              <LoginLink className="text-center text-on-surface-variant hover:text-primary font-label-md text-label-md py-2 transition-colors">
                SignIn
              </LoginLink>
              <RegisterLink className="text-center bg-primary text-white py-2.5 rounded-lg font-label-md text-label-md hover:bg-primary/95 transition-all">
                SignUp
              </RegisterLink>
            </div>
          )}
          {!isLoading && isAuthenticated && (
            <div className="pt-2 border-t border-outline-variant/50">
              <LogoutLink className="block text-center bg-primary-container text-on-primary-container py-2.5 rounded-lg font-label-md text-label-md hover:opacity-90 transition-all">
                LogOut
              </LogoutLink>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default NavBar;
