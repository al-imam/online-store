import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import dbConnect from "@/backend/config/dbConnect";
import User from "@/backend/models/user";
import { compareSync } from "bcryptjs";

const options: AuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials as any;
        dbConnect();
        const search = await User.findOne({ email });

        if (!search) {
          throw new Error("user not found");
        }

        if (!compareSync(email, search.password)) {
          throw new Error("email and password not match!");
        }

        return {
          id: search._id as any,
          name: search.name,
          email: search.email,
        };
      },
      credentials: {},
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(options);
