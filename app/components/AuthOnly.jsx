"use client";

import Link from 'next/link';
import { useAuth } from "@/app/lib/useAuth";

const AuthOnly = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="w-full min-h-[400px] animate-pulse bg-transparent"></div>
    );
  }

  if (!isAuthenticated) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-lg border border-[#c0c7cf] bg-white p-8 text-center">
          <h2 className="mt-3 font-serif text-3xl font-semibold text-[#1b1c1c]">Sign in to unlock Noteshaala</h2>
          <Link href="/signup" className="mt-6 w-full flex items-center justify-center gap-2 bg-[#00adef] text-white py-3 rounded-lg hover:bg-[#00658d] transition-all font-semibold shadow-md active:scale-95">
              <span className="material-symbols-outlined text-[20px]">person_add</span>
              Create Your Account
          </Link>
        </div>
      </section>
    );
  }

  return children;
};

export default AuthOnly;
