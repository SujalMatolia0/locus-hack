import { PrismaClient } from '@prisma/client';
import NextAuth, { type AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user?.email || !account?.providerAccountId) return false;

      try {
        // Check if user exists in database
        let existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          // Create a new user (default role is USER)
          existingUser = await prisma.user.create({
            data: {
              githubId: account.providerAccountId,
              name: user.name || '',
              email: user.email,
              image: user.image || '',
            },
          });
        }
        return true;
      } catch (error) {
        console.error('Error checking user in database:', error);
        return false;
      }
    },
    async session({ session }) {
      if (!session.user?.email) return session;

      try {
        const user = await prisma.user.findUnique({
          where: { email: session.user.email },
          select: { id: true, role: true },
        });

        if (user) {
          // Extend session.user with id
          session.user.id = user.id;
          session.user.role = user.role;
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }

      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
};

export default NextAuth(authOptions);
