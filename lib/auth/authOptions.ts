import GoogleProvider from "next-auth/providers/google";
import { db } from "../db/db";
import { user } from "../db/schema";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      async profile(profile, token) {
        const data = {
          fName: profile.given_name,
          lName: profile.family_name,
          email: profile.email,
          provider: "GOOGLE",
          externalId: profile.sub,
          image: profile.picture,
        };

        try {
          const users = await db
            .insert(user)
            .values(data)
            .onConflictDoUpdate({
              target: user.email,
              set: data,
            })
            .returning();

          return {
            ...data,
            name: data.fName,
            id: String(users[0].id),
            role: users[0].role,
          };
        } catch (error) {
          console.log(error);
          return {
            id: "",
          };
        }
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      return session;
    },
    async jwt({ token, user }) {
      console.log("user", user);
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
  },
};
