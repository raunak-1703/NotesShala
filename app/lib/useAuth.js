"use client";

import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";

export const useAuth = () => {
  const auth = useKindeAuth();

  return {
    ...auth,
    isAuthenticated: !auth.isLoading && auth.isAuthenticated,
    isUnauthenticated: !auth.isLoading && !auth.isAuthenticated,
  };
};
