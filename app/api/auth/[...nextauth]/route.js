import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { apiUrl } from "@/app/lib/api";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const res = await fetch(apiUrl("/api/auth/login"), {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" }
          });
          
          const data = await res.json();

          if (res.ok && data.user) {
            return {
              id: data.user.id,
              name: data.user.name,
              email: data.user.email,
              image: data.user.avatar,
              registrationNumber: data.user.registrationNumber,
              token: data.token
            };
          }
          
          throw new Error(data.message || "Invalid credentials");
        } catch (e) {
          throw new Error(e.message || "Something went wrong");
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.registrationNumber = user.registrationNumber;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.registrationNumber = token.registrationNumber;
        session.accessToken = token.accessToken;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_development_only",
});

export { handler as GET, handler as POST };
