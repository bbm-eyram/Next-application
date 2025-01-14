import NextAuth from "next-auth";
import User from "@/models/user";
import connectToDatabase from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Github({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          await connectToDatabase();
          const user = await User.findOne({ email: credentials?.email });
          if (!user) {
            throw new Error("");
          }
          const isValidPassword = await bcrypt.compare(
            credentials?.password ?? "", user.password as string
          );
          if (!isValidPassword) {
            throw new Error("");
          }
          return user;
        } catch {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "github" || account?.provider === "google") {
        await connectToDatabase();
        const existingUser = await User.findOne({ email: profile?.email });

        // Handle logic based on provider (GitHub vs Google)
        if (!existingUser) {
          let defaultName = "Anonymous"; // Default fallback name
          
          // Check provider type to access correct profile field
          if (account?.provider === "github") {
            // For GitHub, use profile.login
            defaultName = profile?.login || profile?.email.split('@')[0] || "Anonymous";
          } else if (account?.provider === "google") {
            // For Google, use profile.name or fallback to email part
            defaultName = profile?.name || profile?.email.split('@')[0] || "Anonymous";
          }

          await User.create({
            name: profile?.name || defaultName,
            email: profile?.email,
          });
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          email: token.email,
          name: token.name,
          image: token.picture,
        };
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
