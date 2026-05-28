"use client"

import React, { useState } from 'react'
import Link from 'next/link';
import useShowToast from '@/hooks/useShowToast'
import { useAuth } from '@/app/lib/useAuth'

const Contact = () => {
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')

    const { isAuthenticated, isUnauthenticated, isLoading } = useAuth();
    const showToast = useShowToast(); 
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (name === '' || message === '') {
            showToast("Error", "Please fill all fields!", "error")
            return;
        }

        setSubmitting(true);
        try {
            const formData = new FormData();
            formData.append("name", name)
            formData.append("message", message)
            formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY);
        
            const response = await fetch("https://api.web3forms.com/submit", {
              method: "POST",
              body: formData
            });
        
            const data = await response.json();
        
            if (data.success) {
                showToast("success", "Message sent successfully", "success");
                setName('');
                setMessage('');
            } else {
                console.error("Error", data);
                showToast("error", data.message || "Submission failed", "error");
            }
        } catch (err) {
            showToast("error", err.message, "error");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section id="contacts" className="py-16 md:py-24 bg-white text-[#191c1e] relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-[#83cfff]/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-[1280px] mx-auto px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* Left Column - Contact Info */}
                    <div className="lg:col-span-5 space-y-8">
                        <div>
                            <span className="text-sm font-semibold uppercase tracking-wide text-[#00658d]">Get in touch</span>
                            <h2 className="font-headline-xl text-headline-xl italic font-bold mt-2">CONTACT US</h2>
                        </div>

                        <div className="bg-[#f2f4f6] border border-[#bdc8d1]/60 rounded-2xl p-6 space-y-5 shadow-sm">
                            {/* Email */}
                            <div className="flex items-start gap-4">
                                <div className="bg-white p-2.5 rounded-xl border border-[#bdc8d1]/30 text-[#00658d] flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[22px]">mail</span>
                                </div>
                                <div>
                                    <h4 className="font-label-sm text-label-sm text-[#576065] uppercase tracking-wider font-bold">Email Support</h4>
                                    <p className="font-label-md text-label-md text-[#191c1e] mt-1 font-semibold">teaminnoreva@nitjsr.ac.in</p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-start gap-4">
                                <div className="bg-white p-2.5 rounded-xl border border-[#bdc8d1]/30 text-[#00658d] flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[22px]">call</span>
                                </div>
                                <div>
                                    <h4 className="font-label-sm text-label-sm text-[#576065] uppercase tracking-wider font-bold">Call Support</h4>
                                    <p className="font-label-md text-label-md text-[#191c1e] mt-1 font-semibold">+91 7004632130</p>
                                </div>
                            </div>

                            {/* Design Credits */}
                            <div className="flex items-start gap-4 pt-4 border-t border-[#bdc8d1]/40">
                                <div className="bg-white p-2.5 rounded-xl border border-[#bdc8d1]/30 text-[#00658d] flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[22px]">architecture</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-label-sm text-label-sm text-[#576065] uppercase tracking-wider font-bold">Platform Credits</h4>
                                    <Link href="/members" className="font-label-md text-label-md text-[#00658d] hover:underline font-bold mt-1 inline-flex items-center gap-1.5">
                                        Designed &amp; Developed by Team Innoreva &rarr;
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Innoreva Logo Container */}
                        <div className="flex items-center gap-4 select-none text-xl">
                            <span className="text-[#576065] text-xl font-semibold">Brought to you by:</span>
                            <img src="/innoreva_logo.png" alt="Innoreva Logo" className="h-20 object-contain brightness-95 opacity-90" />
                        </div>
                    </div>

                    {/* Right Column - Review/Feedback Form */}
                    <div className="lg:col-span-7">
                        <div className="bg-white border border-[#bdc8d1] rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,173,239,0.04)] relative overflow-hidden">
                            {/* Decorative banner design */}
                            <div className="absolute top-0 right-0 w-36 h-36 bg-[#00adef]/5 rounded-bl-full pointer-events-none"></div>

                            <h3 className="font-headline-md text-headline-md font-bold mb-6 text-[#191c1e] italic">
                                Share Your Experience With Us!
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="flex flex-col gap-2">
                                    <label className="font-label-md text-label-md text-on-surface">Full Name</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-[#f2f4f6] border border-[#bdc8d1] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#00adef]/30 focus:border-[#00658d] outline-none transition-all placeholder:text-[#bfc8ce]" 
                                        placeholder="Your Name" 
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="font-label-md text-label-md text-on-surface">Your Review</label>
                                    <textarea 
                                        className="w-full bg-[#f2f4f6] border border-[#bdc8d1] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#00adef]/30 focus:border-[#00658d] outline-none transition-all placeholder:text-[#bfc8ce] resize-none" 
                                        rows="4" 
                                        placeholder="Type your message here..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    ></textarea>
                                </div>

                                <div className="pt-2">
                                    {isAuthenticated ? (
                                        <button 
                                            type="submit"
                                            disabled={submitting}
                                            className="w-full bg-[#00658d] text-white py-3.5 rounded-xl font-label-md text-label-md uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 hover:shadow-md disabled:opacity-50"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">send</span>
                                            {submitting ? 'Submitting...' : 'Submit Message'}
                                        </button>
                                    ) : isLoading ? (
                                        <button 
                                            disabled 
                                            className="w-full bg-[#00658d] text-white py-3.5 rounded-xl font-label-md text-label-md opacity-70 flex items-center justify-center gap-2 cursor-wait"
                                        >
                                            Checking auth state...
                                        </button>
                                    ) : isUnauthenticated && (
                                        <button 
                                            type="button"
                                            onClick={() => showToast('Error', 'Not Authorized, Please Login!', 'error')} 
                                            className="w-full bg-[#00658d] text-white py-3.5 rounded-xl font-label-md text-label-md uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 hover:shadow-md"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">lock</span>
                                            Login to Submit Review
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Contact;
