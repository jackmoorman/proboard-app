import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '@/lib/prisma';

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  // session: {
  //   strategy: 'jwt',
  // },
  providers: [
    GoogleProvider({
      //@ts-ignore
      clientId: process.env.GOOGLE_ID,
      //@ts-ignore
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    signIn: async ({ account, profile }) => {
      if (account.provider === 'google') {
        if (profile.email_verified && profile.email.endsWith('@gmail.com')) {
          let currentUser = await prisma.user.findUnique({
            where: {
              email: profile.email,
            },
          });
          if (!currentUser) {
            currentUser = await prisma.user.create({
              data: {
                name: profile.name,
                email: profile.email,
                image: profile.picture,
              },
            });
          }
          return true;
        }
      }
      return false;
    },

    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },

    jwt: async ({ token }) => {
      const currentUser = await prisma.user.findUnique({
        where: {
          email: token.email,
        },
      });

      return {
        ...token,
        id: currentUser.id,
      };
    },
  },
};

export default NextAuth(authOptions);
