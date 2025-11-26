import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getConnection } from "./db";
import { z } from "zod";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

const credentialsSchema = z.object({
  identifier: z.string().min(3),
  password: z.string().min(3),
});

export const authOptions: AuthOptions = {
  session: { strategy: "jwt" },

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        identifier: { label: "NIPD/NIK/Admin ID", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { identifier, password } = parsed.data;

        try {
          const db = await getConnection();
          const [rows]: any = await db.query(
            `SELECT * FROM users WHERE nipd = ? OR nik = ? OR admin_id = ? LIMIT 1`,
            [identifier, identifier, identifier]
          );

          const user = rows?.[0];
          if (!user) return null;

          if (password !== user.password) return null;

          return {
            id: user.id,
            name: user.name,
            role: user.role,
            identifier,
          };
        } catch (err) {
          console.error("AUTH ERROR:", err);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = Number(user.id);
        token.name = user.name;
        token.role = user.role;
        token.identifier = user.identifier;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = {
        id: Number(token.id),
        name: token.name,
        role: token.role,
        identifier: token.identifier,
      };
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};
