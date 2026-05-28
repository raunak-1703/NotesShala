"use client";

import { useState, Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { apiUrl } from '@/app/lib/api';
import useShowToast from '@/hooks/useShowToast';

function VerifyEmailForm() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const router = useRouter();
    const showToast = useShowToast();

    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [countdown]);

    const handleResend = async () => {
        if (countdown > 0 || !email) return;

        setIsResending(true);
        try {
            const res = await fetch(apiUrl('/api/auth/resend-otp'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, purpose: 'verification' }),
            });
            const data = await res.json();
            
            if (res.ok) {
                showToast("Success", "A new OTP has been sent to your email", "success");
                setCountdown(60); // Restart cooldown
            } else {
                showToast("Error", data.message || "Failed to resend OTP", "error");
            }
        } catch (error) {
            showToast("Error", "Something went wrong", "error");
        } finally {
            setIsResending(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email) {
            showToast("Error", "Email is missing", "error");
            return;
        }

        if (otp.length !== 6) {
            showToast("Error", "Please enter a valid 6-digit OTP", "error");
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch(apiUrl('/api/auth/verify-otp'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp, purpose: 'verification' }),
            });
            const data = await res.json();
            
            if (res.ok) {
                showToast("Success", "Email verified successfully. You can now log in.", "success");
                router.push('/login');
            } else {
                showToast("Error", data.message || "Failed to verify OTP", "error");
            }
        } catch (error) {
            showToast("Error", "Something went wrong", "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="text-center mb-6">
                <p className="text-on-surface-variant font-body-md">
                    We've sent a verification code to <br/>
                    <span className="font-bold text-on-surface">{email}</span>
                </p>
            </div>
            
            {/* OTP Field */}
            <div>
                <label className="font-label-md text-label-md text-on-surface-variant mb-2 block font-semibold" htmlFor="otp">Verification Code (OTP)</label>
                <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">pin</span>
                    <input 
                        className="w-full pl-10 pr-4 py-3 bg-white border border-outline-variant rounded-lg font-body-md text-body-md focus:outline-none focus:border-[#00adef] focus:ring-2 focus:ring-[#00adef]/20 transition-all text-center tracking-widest text-xl" 
                        id="otp" 
                        placeholder="------" 
                        type="text"
                        maxLength={6}
                        required
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} // Only allow digits
                    />
                </div>
            </div>

            {/* Verify Button */}
            <button 
                className="w-full py-4 bg-[#00adef] hover:bg-[#00658d] transition-colors rounded-lg font-label-md text-label-md text-white shadow-md active:scale-[0.98] font-bold flex items-center justify-center" 
                type="submit"
                disabled={isLoading}
            >
                {isLoading ? (
                    <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span>
                ) : null}
                {isLoading ? "Verifying..." : "Verify Email"}
            </button>

            {/* Resend Option */}
            <div className="text-center pt-2">
                <p className="font-body-sm text-on-surface-variant">
                    Didn't receive the code?{' '}
                    <button
                        type="button"
                        onClick={handleResend}
                        disabled={countdown > 0 || isResending}
                        className={`font-bold transition-colors ${countdown > 0 || isResending ? 'text-outline cursor-not-allowed' : 'text-[#00adef] hover:underline'}`}
                    >
                        {isResending ? 'Sending...' : countdown > 0 ? `Resend in ${countdown}s` : 'Resend Code'}
                    </button>
                </p>
            </div>
        </form>
    );
}

export default function VerifyEmailPage() {
    return (
        <div className="min-h-[85vh] flex flex-col bg-[#F0F9FF]">
            <main className="flex-grow flex items-center justify-center p-6 relative overflow-hidden">
                {/* Background Decorative Element */}
                <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                    <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#00adef]/10 blur-3xl"></div>
                    <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#97a2b9]/10 blur-3xl"></div>
                </div>

                {/* Centered Card */}
                <div className="w-full max-w-[480px] bg-white rounded-xl p-10 academic-card border border-[#bdc8d1] relative z-10 shadow-[0_4px_20px_rgba(0,173,239,0.08)]">
                    <div className="text-center mb-10">
                        <span className="material-symbols-outlined text-6xl text-[#00adef] mb-4">mark_email_read</span>
                        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2 font-bold">Verify Your Email</h1>
                    </div>

                    <Suspense fallback={<div className="text-center">Loading...</div>}>
                        <VerifyEmailForm />
                    </Suspense>
                </div>
            </main>
        </div>
    );
}
