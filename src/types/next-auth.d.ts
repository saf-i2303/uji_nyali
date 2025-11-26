import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name: string;
      role: string;
      identifier: string;
    };
  }

  interface User {
    id: number;
    name: string;
    role: string;
    identifier: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    name: string;
    role: string;
    identifier: string;
  }
}
