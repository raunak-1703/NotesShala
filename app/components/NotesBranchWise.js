"use client"
import Link from 'next/link'
import React from 'react'
import useShowToast from '@/hooks/useShowToast'
import { useAuth } from '@/app/lib/useAuth'

const NotesBranchWise = () => {
    const { isAuthenticated, isUnauthenticated, isLoading } = useAuth();
    const showToast = useShowToast();
    return  (
        <div 
        className='py-20 min-h-screen bg-cover bg-center bg-no-repeat'
        style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1527176930608-09cb256ab504?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        
            
        }}
    >
            <div className='px-10 py-5 mt-5 lg:ml-20 text-center '>
                <h2 className='text-3xl lg:text-5xl font-semibold py-2 pb-4'>Notes</h2>
                <p>Gets your hands on your study materials now !</p>
            </div>
            {isLoading && (
                <div className="flex justify-center items-center mt-8 text-lg">
                    Checking session...
                </div>
            )}
            {isAuthenticated ? (<div className="flex justify-center items-center gap-10">
                <div className='lg:w-[65vw] mt-8 flex flex-wrap justify-center items-center gap-10 lg:gap-16'>
                    <div className="flex flex-col justify-center items-center">
                        <Link href='/EE'>
                            <div className='w-32 h-28 md:w-40 md:h-36 rounded-xl text-center flex justify-center items-center p-2 bg-gradient-to-r from-[#29b5f6] to-[#67c5f1d5] transition-all duration-300 hover:scale-105'>
                                Electrical
                            </div>
                        </Link>

                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <Link href='/ECE'>
                            <div className='w-32 h-28 md:w-40 md:h-36 rounded-xl text-center flex justify-center items-center p-2  bg-gradient-to-r from-[#29b5f6] to-[#67c5f1d5] transition-all duration-300 hover:scale-105'>
                                Electronics and Communication
                            </div>
                        </Link>

                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <Link href='/ME'>
                            <div className='w-32 h-28 md:w-40 md:h-36 rounded-xl text-center flex justify-center items-center p-2 bg-gradient-to-r from-[#29b5f6] to-[#67c5f1d5] transition-all duration-300 hover:scale-105'>
                                Mechanical
                            </div>
                        </Link>

                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <Link href='/CSE'>
                            <div className='w-32 h-28 md:w-40 md:h-36 rounded-xl text-center flex justify-center items-center p-2 bg-gradient-to-r from-[#29b5f6] to-[#67c5f1d5] transition-all duration-300 hover:scale-105'>
                                Computer Science
                            </div>
                        </Link>

                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <Link href='/CE'>
                            <div className='w-32 h-28 md:w-40 md:h-36 rounded-xl text-center flex justify-center items-center p-2 bg-gradient-to-r from-[#29b5f6] to-[#67c5f1d5] transition-all duration-300 hover:scale-105'>
                                Civil
                            </div>
                        </Link>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <Link href='/MME'>
                            <div className='w-32 h-28 md:w-40 md:h-36 rounded-xl text-center flex justify-center items-center p-2 bg-gradient-to-r from-[#29b5f6] to-[#67c5f1d5] transition-all duration-300 hover:scale-105'>
                                Material and Metallurgy
                            </div>
                        </Link>

                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <Link href='/PIE'>
                            <div className='w-32 h-28 md:w-40 md:h-36 rounded-xl text-center flex justify-center items-center p-2 bg-gradient-to-r from-[#29b5f6] to-[#67c5f1d5] transition-all duration-300 hover:scale-105'>
                                Production and Industrial
                            </div>
                        </Link>

                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <Link href='/ECM'>
                            <div className='w-32 h-28 md:w-40 md:h-36 rounded-xl text-center flex justify-center items-center p-2 bg-gradient-to-r from-[#29b5f6] to-[#67c5f1d5] transition-all duration-300 hover:scale-105'>
                                Computational mechanics
                            </div>
                        </Link>
                    </div>
                </div>
            </div>) :
                isUnauthenticated && (
                    <div className="flex justify-center items-center gap-10">
                        <div className='lg:w-[65vw] mt-8 flex flex-wrap justify-center items-center gap-10 lg:gap-16'>
                            <div className="flex flex-col justify-center items-center">
                                <div className='w-32 h-28 md:w-40 md:h-36 rounded-xl cursor-pointer text-center flex justify-center items-center p-2 bg-gradient-to-r from-[#29b5f6] to-[#67c5f1d5] transition-all duration-300 hover:scale-105'
                                    onClick={() => showToast('Error', 'Please login/register to get notes', 'error')}
                                >
                                    Electrical
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <div className='w-32 h-28 md:w-40 md:h-36 rounded-xl cursor-pointer text-center flex justify-center items-center p-2  bg-gradient-to-r from-[#29b5f6] to-[#67c5f1d5] transition-all duration-300 hover:scale-105'
                                    onClick={() => showToast('Error', 'Please login/register to get notes', 'error')}
                                >
                                    Electronics and Communication
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <div className='w-32 h-28 md:w-40 md:h-36 rounded-xl cursor-pointer text-center flex justify-center items-center p-2 bg-gradient-to-r from-[#29b5f6] to-[#67c5f1d5] transition-all duration-300 hover:scale-105'
                                    onClick={() => showToast('Error', 'Please login/register to get notes', 'error')}
                                >
                                    Mechanical
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <div className='w-32 h-28 md:w-40 md:h-36 rounded-xl cursor-pointer text-center flex justify-center items-center p-2 bg-gradient-to-r from-[#29b5f6] to-[#67c5f1d5] transition-all duration-300 hover:scale-105'
                                    onClick={() => showToast('Error', 'Please login/register to get notes', 'error')}
                                >
                                    Computer Science
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <div className='w-32 h-28 md:w-40 md:h-36 rounded-xl cursor-pointer text-center flex justify-center items-center p-2 bg-gradient-to-r from-[#29b5f6] to-[#67c5f1d5] transition-all duration-300 hover:scale-105'
                                    onClick={() => showToast('Error', 'Please login/register to get notes', 'error')}
                                >
                                    Civil
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <div className='w-32 h-28 md:w-40 md:h-36 rounded-xl cursor-pointer text-center flex justify-center items-center p-2 bg-gradient-to-r from-[#29b5f6] to-[#67c5f1d5] transition-all duration-300 hover:scale-105'
                                    onClick={() => showToast('Error', 'Please login/register to get notes', 'error')}
                                >
                                    Material and Metallurgy
                                </div>

                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <div className='w-32 h-28 md:w-40 md:h-36 rounded-xl cursor-pointer text-center flex justify-center items-center p-2 bg-gradient-to-r from-[#29b5f6] to-[#67c5f1d5] transition-all duration-300 hover:scale-105'
                                    onClick={() => showToast('Error', 'Please login/register to get notes', 'error')}
                                >
                                    Production and Industrial
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <div className='w-32 h-28 md:w-40 md:h-36 rounded-xl cursor-pointer text-center flex justify-center items-center p-2 bg-gradient-to-r from-[#29b5f6] to-[#67c5f1d5] transition-all duration-300 hover:scale-105'>
                                    Computational mechanics
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default NotesBranchWise
