"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { apiUrl } from '@/app/lib/api';
import useShowToast from '@/hooks/useShowToast';

export default function SignUpPage() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const showToast = useShowToast();

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setFormData({ ...formData, email });
        
        const emailRegex = /^\d{4}(UG|PG)[A-Z]+\d+@nitjsr\.ac\.in$/i;
        if (email && !emailRegex.test(email)) {
            setEmailError('Please enter a valid college email');
        } else {
            setEmailError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const emailRegex = /^\d{4}(UG|PG)[A-Z]+\d+@nitjsr\.ac\.in$/i;
        if (!emailRegex.test(formData.email)) {
            setEmailError('Please enter a valid college email');
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch(apiUrl('/api/auth/register'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            
            if (res.ok) {
                showToast("Success", "OTP sent to your email", "success");
                // Redirect to verify email page and pass email in query param
                router.push(`/verify-email?email=${encodeURIComponent(formData.email)}`);
            } else {
                showToast("Error", data.message || "Failed to sign up", "error");
            }
        } catch (error) {
            showToast("Error", "Something went wrong", "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[85vh] flex flex-col bg-[#F0F9FF]">
            <main className="flex-grow flex items-center justify-center p-6 relative overflow-hidden">
                {/* Background Decorative Element */}
                <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                    <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#00adef]/10 blur-3xl"></div>
                    <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#97a2b9]/10 blur-3xl"></div>
                </div>

                {/* Centered Sign-Up Card */}
                <div className="w-full max-w-[480px] bg-white rounded-xl p-10 academic-card border border-[#bdc8d1] relative z-10 shadow-[0_4px_20px_rgba(0,173,239,0.08)]">
                    <div className="text-center mb-10">
                        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2 font-bold">Create Account</h1>
                        <p className="font-body-md text-body-md text-on-surface-variant">Join the academic community at Noteshaala.</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Full Name Field */}
                        <div>
                            <label className="font-label-md text-label-md text-on-surface-variant mb-2 block font-semibold" htmlFor="full_name">Full Name</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">person</span>
                                <input 
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-outline-variant rounded-lg font-body-md text-body-md focus:outline-none focus:border-[#00adef] focus:ring-2 focus:ring-[#00adef]/20 transition-all" 
                                    id="full_name" 
                                    placeholder="Your Name" 
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                        </div>

                        {/* College Email Field */}
                        <div>
                            <label className="font-label-md text-label-md text-on-surface-variant mb-2 block font-semibold" htmlFor="college_email">College Email</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">school</span>
                                <input 
                                    className={`w-full pl-10 pr-4 py-3 bg-white border ${emailError ? 'border-red-500' : 'border-outline-variant'} rounded-lg font-body-md text-body-md focus:outline-none focus:border-[#00adef] focus:ring-2 focus:ring-[#00adef]/20 transition-all`}
                                    id="college_email" 
                                    placeholder="2024UGMEXXX@nitjsr.ac.in" 
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleEmailChange}
                                />
                            </div>
                            {emailError && <p className="mt-2 text-[12px] text-red-500 font-body-md">{emailError}</p>}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="font-label-md text-label-md text-on-surface-variant mb-2 block font-semibold" htmlFor="password">Password</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">lock</span>
                                <input 
                                    className="w-full pl-10 pr-12 py-3 bg-white border border-outline-variant rounded-lg font-body-md text-body-md focus:outline-none focus:border-[#00adef] focus:ring-2 focus:ring-[#00adef]/20 transition-all" 
                                    id="password" 
                                    placeholder="••••••••" 
                                    type={showPassword ? "text" : "password"}
                                    required
                                    minLength={8}
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                />
                                <button 
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors" 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <span className="material-symbols-outlined text-[20px]">{showPassword ? "visibility_off" : "visibility"}</span>
                                </button>
                            </div>
                            <p className="mt-2 text-[12px] text-on-surface-variant font-body-md">Must be at least 8 characters long.</p>
                        </div>

                        {/* Sign Up Button */}
                        <button 
                            className="w-full py-4 bg-[#00adef] hover:bg-[#00658d] transition-colors rounded-lg font-label-md text-label-md text-white shadow-md active:scale-[0.98] font-bold flex items-center justify-center" 
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span>
                            ) : null}
                            {isLoading ? "Signing Up..." : "Sign Up"}
                        </button>
                    </form>

                    <div className="mt-10 pt-6 border-t border-outline-variant text-center">
                        <p className="font-body-md text-body-md text-on-surface-variant">
                            Already have an account? 
                            <Link className="text-[#00adef] font-label-md hover:underline ml-1 font-bold" href="/login">Login</Link>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
