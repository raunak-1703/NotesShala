"use client";

import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
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
          <RegisterLink>
            <span className="mt-6 inline-flex rounded-lg bg-[#18638b] px-5 py-3 font-semibold text-white hover:bg-[#004c6e]">
              Login or create account
            </span>
          </RegisterLink>
        </div>
      </section>
    );
  }

  return children;
};

export default AuthOnly;
