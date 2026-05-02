import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/app/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/sign-in",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Thiếu thông tin đăng nhập");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user) {
          throw new Error("Thông tin đăng nhập không hợp lệ");
        }

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password,
        );

        if (!isValid) {
          throw new Error("Thông tin đăng nhập không hợp lệ");
        }

        return {
          email: user.email,
          id: user.id,
          name: user.name,
        };
      },
      credentials: {
        email: {},
        password: {},
      },
      name: "Credentials",
    }),
  ],

  session: {
    strategy: "jwt",
  },
});
