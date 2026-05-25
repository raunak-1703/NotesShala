"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";

export default function Providers({ children }) {
  return (
    <KindeProvider>
      <ChakraProvider>{children}</ChakraProvider>
    </KindeProvider>
  );
}
