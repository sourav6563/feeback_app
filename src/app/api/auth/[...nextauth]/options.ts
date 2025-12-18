import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/model/user";
import { NextAuthOptions } from "next-auth";
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "domain-login",
      name: "Domain Account",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          const user = await User.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });
          if (!user) {
            throw new Error("User not found");
          }
          if (!user.isVerified) {
            throw new Error(`Please verify your account before Login`);
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Incorrect password");
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user._id = token._id;
      session.user.isVerified = token.isVerified;
      session.user.isAcceptingMessages = token.isAcceptingMessages;
      session.user.username = token.username;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString(); // Convert ObjectId to string
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
      }
      return token;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
