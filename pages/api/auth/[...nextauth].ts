import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";

import { prisma } from "../../../utils/prisma";

import { UserAccountType } from "../../../types/types";

let userAccount: UserAccountType;

const confirmPasswordHash = (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  return new Promise(resolve => {
    bcrypt.compare(plainPassword, hashedPassword, (err, res) => {
      resolve(res);
    });
  });
};

const configuration: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60
  },
  secret: process.env.NEXT_JWT_SECRET,
  pages: {
    signIn: "/login",
    error: "/login"
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "E-mail",
      credentials: {
        email: { label: "email", type: "text" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials){
        try {
          if (credentials) {
            const user = await prisma.clients.findFirst({
              where: {
                email: credentials.email
              }
            });
  
            if (user) {
              //Compare the hash
              const res = await confirmPasswordHash(credentials.password, user.password);
              if (res) {
                userAccount = {
                  id: user.clientId,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email,
                  phone: user.phone,
                  isActive: user.isActive,
                  admin: user.admin
                };
                return userAccount;
              } else {
                console.log("Hash not matched logging in");
                return null;
              }
            } else {
              return null;
            }
          } else {
            return null;
          }
        } catch (err) {
          console.log("Authorize error:", err);
          return null;
        }
      }
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        // console.log("Sign in callback", user);
        // console.log("User id: ", user.id);
        if (user.id) {
          if (user.isActive === "1") {
            console.log("User is active");
            return true;
          } else {
            console.log("User is not active");
            return "/login";
          }
        } else {
          console.log("User id was undefined");
          return "/login";
        }
      } catch (err) {
        console.error("Signin callback error:", err);
        throw err;
      }
    },
    async session({ session, token, user }) {
      if (userAccount) {
        session.user = userAccount;
      } else if (token.user) {
        session.user = token.user;
      } else if (token) {
        session.token = token;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // console.log("jwt");
      // console.log({ token, user, account, profile, isNewUser });
      if (user) {
        token.user = user;
      }
      return token;
    }
  }
};

export default NextAuth(configuration);