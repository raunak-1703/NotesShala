"use client"

import Link from 'next/link'
import React from 'react'
import useShowToast from '@/hooks/useShowToast'
import { useAuth } from '@/app/lib/useAuth'

const ShareNotes = () => {
    const { isAuthenticated, isUnauthenticated, isLoading } = useAuth();
    const showToast = useShowToast();

    return (
        <section className="max-w-[1280px] mx-auto px-8 pb-16 pt-10">
            <div className="bg-[#00658d] text-white rounded-[2.5rem] p-12 md:p-16 text-center relative overflow-hidden shadow-lg select-none">
                
                {/* Content Overlay */}
                <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                    <h2 className="font-headline-xl text-headline-xl italic font-bold">
                        SHARE YOUR NOTES
                    </h2>
                    
                    <p className="text-body-lg opacity-90 leading-relaxed">
                        Help your fellow mates by sharing your valuable notes. Every document counts, and we thank you on behalf of the entire batch!
                    </p>

                    {isAuthenticated && (
                        <Link href="/uploadnotes" className="inline-flex">
                            <button className="bg-[#00adef] text-white px-10 py-4 rounded-xl font-label-md text-label-md hover:bg-opacity-95 hover:scale-105 active:scale-95 transition-all shadow-md">
                                Upload Notes Now
                            </button>
                        </Link>
                    )}
                    {isLoading && (
                        <button className="bg-[#00adef] text-white px-10 py-4 rounded-xl font-label-md text-label-md opacity-70 cursor-wait">
                            Checking session...
                        </button>
                    )}
                    {isUnauthenticated && (
                        <button 
                            onClick={() => showToast('Error', 'Please login/register to upload notes', 'error')} 
                            className="bg-[#00adef] text-white px-10 py-4 rounded-xl font-label-md text-label-md hover:scale-105 active:scale-95 transition-all shadow-md"
                        >
                            Upload Notes Now
                        </button>
                    )}
                </div>

                {/* Decorative background icons */}
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none select-none">
                    <span className="material-symbols-outlined text-[160px]">upload</span>
                </div>
                <div className="absolute bottom-0 left-0 p-8 opacity-10 pointer-events-none select-none">
                    <span className="material-symbols-outlined text-[160px]">group</span>
                </div>

            </div>
        </section>
    )
}

export default ShareNotes;
