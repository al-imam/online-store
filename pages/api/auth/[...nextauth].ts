import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import dbConnect from "@/backend/config/dbConnect";
import User from "@/backend/models/user";
import { compareSync } from "bcryptjs";

function remove({
  name,
  email,
  avatar,
  _id,
  created,
  role,
}: {
  [key: string]: any;
}) {
  return { name, email, avatar, _id, created, role };
}

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

        if (!compareSync(password, search.password)) {
          throw new Error("/singin");
        }

        return remove(search) as any;
      },
      credentials: {},
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);

      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user as any;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/singin",
  },
};

export default NextAuth(options);
