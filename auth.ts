import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import bcryptjs from 'bcryptjs';


export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },
  callbacks: {
    jwt({ token, user }) {
      if ( user ) {
        token.data = user;
      }

      return token;
    },
    session({ session, token, user }) {
      session.user = token.data as any;

      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

          if ( !parsedCredentials.success ) return null;

          const { email, password } = parsedCredentials.data;

          // Check if the email exists in the DB
          const user = await prisma.user.findUnique({ where: { email } });
          if ( !user ) return null;

          // Compare passwords
          if ( !bcryptjs.compareSync( password, user.password ) ) return null;

          // Return the user without the password
          const { password: _, ...rest } = user;
          // console.log({ rest });
          return rest;
      },
    }),
  ],
});