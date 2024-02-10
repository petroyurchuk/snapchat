import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { connectToMongoDB } from "@/lib/db";
import User from "./models/userModel";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Github({
      clientId: process.env.AUTH_GITHUB_ID || "",
      clientSecret: process.env.AUTH_GITHUB_SECRET || "",
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "github") {
        await connectToMongoDB();

        try {
          const user = User.findOne({ email: profile?.email });

          if (!user) {
            const newUser = await User.create({
              username: profile?.sub,
              email: profile?.email,
              fullName: profile?.name,
              avatar: profile?.image,
            });
            await newUser.save();
          }
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      return false;
    },
  },
});
