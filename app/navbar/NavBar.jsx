"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import useShowToast from '@/hooks/useShowToast';
import { useAuth } from '@/app/lib/useAuth';

function NavBar() {
  const [navbar, setNavbar] = useState(false);
  const { isAuthenticated, isUnauthenticated, isLoading } = useAuth();

  const showToast = useShowToast();

  const handleLinkClick = () => {
    if (navbar) {
      setNavbar(false);
    }
  };
  const handleLinkClickProfile = () => {
    if (isLoading) {
      return;
    }

    showToast('Error','Not authenticated Please login/signUp!','error');
    if (navbar) {
      setNavbar(false);
    }
  };

  return (
    <div>
      <nav className="w-full shadow bg-slate-50 fixed top-0 left-0 right-0 z-10 font-etica">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div className="flex items-center justify-between py-2 md:py-3 w-full">
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <img src="/close.svg" className='w-5 md:w-10' alt="close" />
                ) : (
                  <img
                    src="/hamburger-menu.svg"
                    alt="menu"
                    className="focus:border-none w-5 md:w-10 active:border-none"
                  />
                )}
              </button>
            </div>

            <Link href="/" className='flex items-center'>
            <div className='w-12 h-12 sm:w-16 sm:h-16  bg-cover mr-4' style={{backgroundImage: "url(/NoteShaala_Logo.png)"}}></div>
              <h2 className="lg:text-3xl text-2xl text-black font-bold hidden md:block ">NOTESHAALA</h2>
            </Link>

            {navbar && (
              <div className="mr-4 flex items-center md:hidden">
                <div>
                  <Image
                    src="/user.svg"
                    width={30}
                    height={30}
                    alt="User"
                    className="cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 md:block md:pb-0 md:mt-0 ${
                navbar ? 'px-12 py-4 md:p-0 block' : 'hidden'
              } ${navbar ? 'text-center justify-center' : ''}`}
            >
              <ul className={` md:h-auto items-center ${navbar ? 'justify-center flex-col' : 'md:flex'}`}>
                <li className={`pb-2 py-2 md:px-6 text-center border-b-2 md:border-b-0  border-gray-800 md:hover:text-blue-600 ${
                  navbar ? 'text-xl my-4' : 'text-xl'
                }`}>
                  {
                    isAuthenticated ? (
                    <Link href='/usernotes' onClick={handleLinkClick}>
                    <div className="flex items-center justify-center">
                      <Image
                        src="/user.svg"
                        width={20}
                        height={20}
                        alt="User"
                        className="cursor-pointer mr-2"
                      />
                      Profile
                    </div>
                  </Link>) : (
                    <div onClick={handleLinkClickProfile}>
                    <div className="flex items-center justify-center">
                      <Image
                        src="/user.svg"
                        width={20}
                        height={20}
                        alt="User"
                        className="cursor-pointer mr-2"
                      />
                      Profile
                    </div>
                  </div>)
                  }
                </li>
                <li className={`pb-2 py-2 px-6 text-center border-b-2 md:border-b-0  border-gray-800 md:hover:text-blue-600 ${
                  navbar ? 'text-xl my-4' : 'text-xl'
                }`}>
                  <Link href="/#notes" onClick={handleLinkClick}>
                    <div className="flex items-center justify-center space-x-4">
                      <Image
                        src="/notes.svg"
                        width={20}
                        height={20}
                        alt="Note"
                        className="cursor-pointer mr-2"
                      />
                      Notes
                    </div>
                  </Link>
                </li>
                <li className={`pb-2 py-2 px-6 text-center border-b-2 md:border-b-0  border-gray-800 md:hover:text-blue-600 ${
                  navbar ? 'text-xl my-4' : 'text-xl'
                }`}>
                  <Link href="/#reviews" onClick={handleLinkClick}>
                    <div className="flex items-center justify-center space-x-4">
                      <Image
                        src="/smile.svg"
                        width={20}
                        height={20}
                        alt="Smile"
                        className="cursor-pointer mr-2"
                      />
                      Reviews
                    </div>
                  </Link>
                </li>
                <li className={`pb-2 py-2 px-6 text-center border-b-2 md:border-b-0  border-gray-800 md:hover:text-blue-600 ${
                  navbar ? 'text-xl my-4' : 'text-xl'
                }`}>
                  <Link href="/#uploads" onClick={handleLinkClick}>
                    <div className="flex items-center justify-center space-x-4">
                      <Image
                        src="/upload.svg"
                        width={20}
                        height={20}
                        alt="Upload"
                        className="cursor-pointer mr-2"
                      />
                      Upload
                    </div>
                  </Link>
                </li>
                <li className={`pb-2 py-2 px-6 text-center border-b-2 md:border-b-0  border-gray-800 md:hover:text-blue-600 ${
                  navbar ? 'text-xl my-4' : 'text-xl'
                }`}>
                  <Link href="/#contacts" onClick={handleLinkClick}>
                    <div className="flex items-center justify-center space-x-4">
                      <Image
                        src="/arrows.svg"
                        width={20}
                        height={20}
                        alt="Arrow"
                        className="cursor-pointer mr-2"
                      />
                      Contact
                    </div>
                  </Link>
                </li>
                <li className={`pb-2 py-2 px-6 text-center border-b-2 md:border-b-0 border-gray-800 md:hover:text-blue-600 ${
                  navbar ? 'text-xl my-4' : 'text-xl'
                }`}>
                  {isUnauthenticated && (
                    <LoginLink>
                      <div className="flex items-center justify-center border-[#29b5f6] py-1 px-2 rounded-lg border-[3px] hover:bg-blue-200">
                        SignIn
                      </div>
                    </LoginLink>
                  )}
                  {isAuthenticated && (
                    <LogoutLink>
                      <div className="flex items-center justify-center bg-gradient-to-r from-[#29b5f6] to-[#67c5f1d5] py-1 px-2 rounded-lg hover:bg-blue-300">
                        LogOut
                      </div>
                    </LogoutLink>
                  )}
                </li>
                {isUnauthenticated && (
                  <li className={`pb-2 py-2 px-6 text-center border-b-2 md:border-b-0 border-gray-800 md:hover:text-blue-600 ${
                    navbar ? 'text-xl my-4' : 'text-xl'
                  }`}>
                    <RegisterLink>
                      <div className="flex items-center justify-center bg-gradient-to-r from-[#29b5f6] to-[#67c5f1d5] py-1 px-2 rounded-lg hover:bg-blue-300">
                        SignUp
                      </div>
                    </RegisterLink>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
