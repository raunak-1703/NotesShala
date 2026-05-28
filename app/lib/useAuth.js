"use client";

import { useSession, signOut } from "next-auth/react";

export const useAuth = () => {
  const { data: session, status } = useSession();

  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";

  return {
    user: session?.user,
    token: session?.accessToken,
    isLoading,
    isAuthenticated,
    isUnauthenticated: status === "unauthenticated",
    logout: () => signOut({ callbackUrl: '/' })
  };
};
