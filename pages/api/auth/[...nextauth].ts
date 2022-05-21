import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "../../../utils/prisma";
import * as bcrypt from "bcrypt";
import { DefaultJWT } from "next-auth/jwt";
import { NextApiRequest, NextApiResponse } from "next";

import { UserAccountType } from "../../../types/types";

let userAccount: UserAccountType;
const prisma = db;

const confirmPasswordHash = (plainPassword: string, hashedPassword: string) => {
  return new Promise(resolve => {
    bcrypt.compare(plainPassword, hashedPassword, (err, res) => {
      resolve(res);
    });
  });
};

const configuration = {
  cookie: {
    secure: process.env.NODE_ENV && process.env.NODE_ENV === "production",
  },
  session: {
    maxAge: 30 * 24 * 60 * 60
  },
  jwt: {
    secret: process.env.NEXT_JWT_SECRET
  },
  pages: {
    signIn: "/login",
    error: "/login"
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "E-mail",
      credentials: {},
      async authorize(credentials: any): Promise<any> {
        try {
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
                clientId: user.clientId,
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
        } catch (err) {
          console.log("Authorize error:", err);
        }

      }
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: User }) {
      try {
        // console.log("Sign in callback", user);
        // console.log("User id: ", user.clientId);
        if (user.clientId) {
          if (user.isActive === "1") {
            console.log("User is active");
            return user;
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
      }

    },
    async register({firstName, lastName, email, password, phone }: { firstName: string, lastName: string, email: string, password: string, phone: string}) {
      try {
        await prisma.clients.create({
          data: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            phone: phone
          }
        });
        return true;
      } catch (err) {
        console.error("Failed to register user. Error", err);
        return "/registration";
      }

    },
    async session({session, token, user}: Session) {
      session.accessToken = token.accessToken;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }: DefaultJWT) {
      if (user) {
        token.user = user;
      }
      return token;
    }
  }
};

const index = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, configuration as unknown as NextAuthOptions);

export default index;