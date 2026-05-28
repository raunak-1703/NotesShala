"use client";

import { useState, Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { apiUrl } from '@/app/lib/api';
import useShowToast from '@/hooks/useShowToast';

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
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
                body: JSON.stringify({ email, purpose: 'reset_password' }),
            });
            const data = await res.json();
            
            if (res.ok) {
                showToast("Success", "A new OTP has been sent to your email", "success");
                setCountdown(60);
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

        if (newPassword.length < 8) {
            showToast("Error", "Password must be at least 8 characters long", "error");
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch(apiUrl('/api/auth/reset-password'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp, newPassword }),
            });
            const data = await res.json();
            
            if (res.ok) {
                showToast("Success", "Password reset successfully. You can now log in.", "success");
                router.push('/login');
            } else {
                showToast("Error", data.message || "Failed to reset password", "error");
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
                    Enter the code sent to <br/>
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

            {/* New Password Field */}
            <div>
                <label className="font-label-md text-label-md text-on-surface-variant mb-2 block font-semibold" htmlFor="new_password">New Password</label>
                <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">lock</span>
                    <input 
                        className="w-full pl-10 pr-12 py-3 bg-white border border-outline-variant rounded-lg font-body-md text-body-md focus:outline-none focus:border-[#00adef] focus:ring-2 focus:ring-[#00adef]/20 transition-all" 
                        id="new_password" 
                        placeholder="••••••••" 
                        type={showPassword ? "text" : "password"}
                        required
                        minLength={8}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button 
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors" 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        <span className="material-symbols-outlined text-[20px]">{showPassword ? "visibility_off" : "visibility"}</span>
                    </button>
                </div>
            </div>

            {/* Reset Button */}
            <button 
                className="w-full py-4 bg-[#00adef] hover:bg-[#00658d] transition-colors rounded-lg font-label-md text-label-md text-white shadow-md active:scale-[0.98] font-bold flex items-center justify-center" 
                type="submit"
                disabled={isLoading}
            >
                {isLoading ? (
                    <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span>
                ) : null}
                {isLoading ? "Resetting..." : "Set New Password"}
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

export default function ResetPasswordPage() {
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
                        <span className="material-symbols-outlined text-6xl text-[#00adef] mb-4">password</span>
                        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2 font-bold">Choose New Password</h1>
                    </div>

                    <Suspense fallback={<div className="text-center">Loading...</div>}>
                        <ResetPasswordForm />
                    </Suspense>
                </div>
            </main>
        </div>
    );
}
