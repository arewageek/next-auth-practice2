import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";

import prisma from "@/lib/prisma";
import NextAuth from "next-auth/next";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Email Address",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!user) throw new Error("Email or Password is not correct");

        if (!credentials?.password)
          throw new Error("Please provide a password");

        const isPasswordCorrect = await bcrypt.compare(
          credentials?.password,
          user.password
        );

        if (!isPasswordCorrect) throw new Error("Password is incorrect");

        const { password, ...userWithoutPass } = user;

        return userWithoutPass;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
