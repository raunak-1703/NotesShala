"use client"

import Link from 'next/link'
import React from 'react'
import useShowToast from '@/hooks/useShowToast'
import { useAuth } from '@/app/lib/useAuth'

const NotesBranchWise = () => {
    const { isAuthenticated, isUnauthenticated } = useAuth();
    const showToast = useShowToast();

    const handleUnauthClick = (branchName) => {
        showToast('Error', `Please login/register to get ${branchName} notes`, 'error');
    };

    return (
        <section id="notes" className="py-16 md:py-24 bg-[#f2f4f6]/60 border-t border-b border-[#bdc8d1]/30">
            <div className="max-w-[1280px] mx-auto px-8">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-wide text-[#00658d]">Academic catalog</p>
                        <h2 className="font-headline-lg text-headline-lg font-bold italic mt-2 text-[#191c1e]">
                            Discover Your Specialized Path
                        </h2>
                        <p className="text-body-md text-[#576065] mt-2">
                            Browse comprehensive peer-to-peer study materials organized by engineering branches. High-quality notes curated for your success.
                        </p>
                    </div>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    
                    {/* CSE (Card 1) */}
                    {isAuthenticated ? (
                        <Link href="/CSE" className="bg-white border border-[#bdc8d1] p-6 rounded-2xl flex flex-col justify-between hover:bg-[#c6e7ff]/20 transition-all bento-card shadow-sm hover:-translate-y-1">
                            <div className="w-14 h-14 bg-[#f2f4f6] rounded-full flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-[#00658d] text-3xl">memory</span>
                            </div>
                            <div>
                                <h3 className="font-headline-sm text-headline-sm text-[#191c1e] font-bold">CSE</h3>
                            </div>
                        </Link>
                    ) : (
                        <div 
                            onClick={() => handleUnauthClick('CSE')}
                            className="bg-white border border-[#bdc8d1] p-6 rounded-2xl flex flex-col justify-between hover:bg-[#c6e7ff]/20 transition-all bento-card cursor-pointer shadow-sm"
                        >
                            <div className="w-14 h-14 bg-[#f2f4f6] rounded-full flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-[#00658d] text-3xl">memory</span>
                            </div>
                            <div>
                                <h3 className="font-headline-sm text-headline-sm text-[#191c1e] font-bold">CSE</h3>
                            </div>
                        </div>
                    )}

                    {/* EE (Card 2) */}
                    {isAuthenticated ? (
                        <Link href="/EE" className="bg-white border border-[#bdc8d1] p-6 rounded-2xl flex flex-col justify-between hover:bg-[#c6e7ff]/20 transition-all bento-card shadow-sm hover:-translate-y-1">
                            <div className="w-14 h-14 bg-[#f2f4f6] rounded-full flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-[#00658d] text-3xl">bolt</span>
                            </div>
                            <div>
                                <h3 className="font-headline-sm text-headline-sm text-[#191c1e] font-bold">Electrical (EE)</h3>
                            </div>
                        </Link>
                    ) : (
                        <div 
                            onClick={() => handleUnauthClick('Electrical')}
                            className="bg-white border border-[#bdc8d1] p-6 rounded-2xl flex flex-col justify-between hover:bg-[#c6e7ff]/20 transition-all bento-card cursor-pointer shadow-sm"
                        >
                            <div className="w-14 h-14 bg-[#f2f4f6] rounded-full flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-[#00658d] text-3xl">bolt</span>
                            </div>
                            <div>
                                <h3 className="font-headline-sm text-headline-sm text-[#191c1e] font-bold">Electrical (EE)</h3>
                            </div>
                        </div>
                    )}

                    {/* ME (Card 3) */}
                    {isAuthenticated ? (
                        <Link href="/ME" className="bg-white border border-[#bdc8d1] p-6 rounded-2xl flex flex-col justify-between hover:bg-[#c6e7ff]/20 transition-all bento-card shadow-sm hover:-translate-y-1">
                            <div className="w-14 h-14 bg-[#f2f4f6] rounded-full flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-[#00658d] text-3xl">settings</span>
                            </div>
                            <div>
                                <h3 className="font-headline-sm text-headline-sm text-[#191c1e] font-bold">Mechanical</h3>
                            </div>
                        </Link>
                    ) : (
                        <div 
                            onClick={() => handleUnauthClick('Mechanical')}
                            className="bg-white border border-[#bdc8d1] p-6 rounded-2xl flex flex-col justify-between hover:bg-[#c6e7ff]/20 transition-all bento-card cursor-pointer shadow-sm"
                        >
                            <div className="w-14 h-14 bg-[#f2f4f6] rounded-full flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-[#00658d] text-3xl">settings</span>
                            </div>
                            <div>
                                <h3 className="font-headline-sm text-headline-sm text-[#191c1e] font-bold">Mechanical</h3>
                            </div>
                        </div>
                    )}

                    {/* CE (Card 4) */}
                    {isAuthenticated ? (
                        <Link href="/CE" className="bg-white border border-[#bdc8d1] p-6 rounded-2xl flex flex-col justify-between hover:bg-[#c6e7ff]/20 transition-all bento-card shadow-sm hover:-translate-y-1">
                            <div className="w-14 h-14 bg-[#f2f4f6] rounded-full flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-[#00658d] text-3xl">domain</span>
                            </div>
                            <div>
                                <h3 className="font-headline-sm text-headline-sm text-[#191c1e] font-bold">Civil (CE)</h3>
                            </div>
                        </Link>
                    ) : (
                        <div 
                            onClick={() => handleUnauthClick('Civil')}
                            className="bg-white border border-[#bdc8d1] p-6 rounded-2xl flex flex-col justify-between hover:bg-[#c6e7ff]/20 transition-all bento-card cursor-pointer shadow-sm"
                        >
                            <div className="w-14 h-14 bg-[#f2f4f6] rounded-full flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-[#00658d] text-3xl">domain</span>
                            </div>
                            <div>
                                <h3 className="font-headline-sm text-headline-sm text-[#191c1e] font-bold">Civil (CE)</h3>
                            </div>
                        </div>
                    )}

                    {/* MME (Card 5) */}
                    {isAuthenticated ? (
                        <Link href="/MME" className="bg-white border border-[#bdc8d1] p-6 rounded-2xl flex flex-col justify-between hover:bg-[#c6e7ff]/20 transition-all bento-card shadow-sm hover:-translate-y-1">
                            <div className="w-14 h-14 bg-[#f2f4f6] rounded-full flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-[#00658d] text-3xl">science</span>
                            </div>
                            <div>
                                <h3 className="font-headline-sm text-headline-sm text-[#191c1e] font-bold">Metallurgy (MME)</h3>
                            </div>
                        </Link>
                    ) : (
                        <div 
                            onClick={() => handleUnauthClick('Material and Metallurgy')}
                            className="bg-white border border-[#bdc8d1] p-6 rounded-2xl flex flex-col justify-between hover:bg-[#c6e7ff]/20 transition-all bento-card cursor-pointer shadow-sm"
                        >
                            <div className="w-14 h-14 bg-[#f2f4f6] rounded-full flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-[#00658d] text-3xl">science</span>
                            </div>
                            <div>
                                <h3 className="font-headline-sm text-headline-sm text-[#191c1e] font-bold">Metallurgy (MME)</h3>
                            </div>
                        </div>
                    )}

                    {/* ECE (Card 6) */}
                    {isAuthenticated ? (
                        <Link href="/ECE" className="bg-white border border-[#bdc8d1] p-6 rounded-2xl flex flex-col justify-between hover:bg-[#c6e7ff]/20 transition-all bento-card shadow-sm hover:-translate-y-1">
                            <div className="w-14 h-14 bg-[#f2f4f6] rounded-full flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-[#00658d] text-3xl">radar</span>
                            </div>
                            <div>
                                <h3 className="font-headline-sm text-headline-sm text-[#191c1e] font-bold">Electronics (ECE)</h3>
                            </div>
                        </Link>
                    ) : (
                        <div 
                            onClick={() => handleUnauthClick('Electronics and Communication')}
                            className="bg-white border border-[#bdc8d1] p-6 rounded-2xl flex flex-col justify-between hover:bg-[#c6e7ff]/20 transition-all bento-card cursor-pointer shadow-sm"
                        >
                            <div className="w-14 h-14 bg-[#f2f4f6] rounded-full flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-[#00658d] text-3xl">radar</span>
                            </div>
                            <div>
                                <h3 className="font-headline-sm text-headline-sm text-[#191c1e] font-bold">Electronics (ECE)</h3>
                            </div>
                        </div>
                    )}

                    {/* PIE (Card 7) */}
                    {isAuthenticated ? (
                        <Link href="/PIE" className="bg-white border border-[#bdc8d1] p-6 rounded-2xl flex flex-col justify-between hover:bg-[#c6e7ff]/20 transition-all bento-card shadow-sm hover:-translate-y-1">
                            <div className="w-14 h-14 bg-[#f2f4f6] rounded-full flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-[#00658d] text-3xl">precision_manufacturing</span>
                            </div>
                            <div>
                                <h3 className="font-headline-sm text-headline-sm text-[#191c1e] font-bold">Production (PIE)</h3>
                            </div>
                        </Link>
                    ) : (
                        <div 
                            onClick={() => handleUnauthClick('Production and Industrial')}
                            className="bg-white border border-[#bdc8d1] p-6 rounded-2xl flex flex-col justify-between hover:bg-[#c6e7ff]/20 transition-all bento-card cursor-pointer shadow-sm"
                        >
                            <div className="w-14 h-14 bg-[#f2f4f6] rounded-full flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-[#00658d] text-3xl">precision_manufacturing</span>
                            </div>
                            <div>
                                <h3 className="font-headline-sm text-headline-sm text-[#191c1e] font-bold">Production (PIE)</h3>
                            </div>
                        </div>
                    )}

                    {/* ECM (Card 8) */}
                    {isAuthenticated ? (
                        <Link href="/ECM" className="bg-white border border-[#bdc8d1] p-6 rounded-2xl flex flex-col justify-between hover:bg-[#c6e7ff]/20 transition-all bento-card shadow-sm hover:-translate-y-1">
                            <div className="w-14 h-14 bg-[#f2f4f6] rounded-full flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-[#00658d] text-3xl">calculate</span>
                            </div>
                            <div>
                                <h3 className="font-headline-sm text-headline-sm text-[#191c1e] font-bold">Computational</h3>
                            </div>
                        </Link>
                    ) : (
                        <div 
                            onClick={() => handleUnauthClick('Computational mechanics')}
                            className="bg-white border border-[#bdc8d1] p-6 rounded-2xl flex flex-col justify-between hover:bg-[#c6e7ff]/20 transition-all bento-card cursor-pointer shadow-sm"
                        >
                            <div className="w-14 h-14 bg-[#f2f4f6] rounded-full flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-[#00658d] text-3xl">calculate</span>
                            </div>
                            <div>
                                <h3 className="font-headline-sm text-headline-sm text-[#191c1e] font-bold">Computational</h3>
                            </div>
                        </div>
                    )}

                </div>

            </div>
        </section>
    )
}

export default NotesBranchWise;
