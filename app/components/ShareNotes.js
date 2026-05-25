"use client"
import Link from 'next/link'
import React from 'react'
import useShowToast from '@/hooks/useShowToast'
import { useAuth } from '@/app/lib/useAuth'

const ShareNotes = () => {
    const {isAuthenticated, isUnauthenticated, isLoading} = useAuth();
    const showToast = useShowToast();
    return (
        <div className='flex flex-col bg-slate-50 justify-center items-center gap-5 text-center pb-14 pt-10'>
            <h2 className='text-3xl lg:text-4xl font-semibold'>SHARE YOUR NOTES</h2>
            <p className='lg:text-xl lg:my-5 px-2'>Help your fellow mates with by sharing your valuable notes</p>
            {isAuthenticated && (<Link href='/uploadnotes'>
                <div className='border-white border-[2px] rounded-lg px-7 py-2 text-lg bg-[#29b5f6d5] hover:bg-[#29b5f686] hover:scale-[1.02]'>Upload Notes</div>
            </Link>)}
            {
                isLoading && (
                    <div className='border-white border-[2px] rounded-lg px-7 py-2 text-lg bg-[#29b5f6d5] opacity-70'>
                        Checking session...
                    </div>
                )
            }
            {
                isUnauthenticated && (
                    <div 
                    onClick={() => showToast('Error', 'Please login/register to upload notes', 'error')} 
                    className='border-white border-[2px] cursor-pointer rounded-lg px-7 py-2 text-lg bg-[#29b5f6d5] hover:bg-[#29b5f686] hover:scale-[1.02]'
                    >
                        Upload Notes
                    </div>
                )
            }
            <p className='lg:text-xl lg:my-5'>We thank you on behalf of entire batch</p>
        </div>
    )
}

export default ShareNotes
