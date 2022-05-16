import NextAuth, { Account, Profile, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { DefaultJWT, JWT, JWTOptions } from "next-auth/jwt";

import { UserAccountType } from "../../../types/types";
import { NextApiRequest, NextApiResponse } from "next";
import { SessionContextValue, SignInOptions } from "next-auth/react";

let userAccount: UserAccountType;
const prisma = new PrismaClient();

const confirmPasswordHash = (plainPassword: string, hashedPassword: string) => {
  return new Promise(resolve => {
    bcrypt.compare(plainPassword, hashedPassword, function(err, res) {
      resolve(res);
    });
  });
};

const configuration = {
  cookie: {
    secure: process.env.NODE_ENV && process.env.NODE_ENV === "production",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60
  },
  jwt: {
    secret: process.env.NEXT_JWT_SECRET
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
          console.log(user);

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
    async signIn({ user, account, profile, email, credentials }: SignInOptions) {
      try {
        console.log("Sign in callback", user);
        console.log("User id: ", user.clientId);
        if (typeof user.clientId !== typeof undefined) {
          if (user.isActive === "1") {
            console.log("User is active");
            return user;
          } else {
            console.log("User is not active");
            return false;
          }
        } else {
          console.log("User id was undefined");
          return false;
        }
      } catch (err) {
        console.error("Signin callback error:", err);
      }

    },
    async register(firstName: string, lastName: string, email: string, password: string, phone: string) {
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
        return false;
      }

    },
    async session({session, token, user}: Session) {
      session.accessToken = token.accessToken;
      // if (userAccount !== null) {
      //   //session.user = userAccount;
      //   session.user = {
      //     userId: userAccount.clientId,
      //     name: `${userAccount.firstName} ${userAccount.lastName}`,
      //     email: userAccount.email
      //   };
      // } else if (typeof token.user !== typeof undefined && (typeof session.user === typeof undefined || (typeof session.user !== typeof undefined && typeof session.user.userId === typeof undefined))) {
      //   session.user = token.user;
      // } else if (typeof token !== typeof undefined) {
      //   session.token = token;
      // }
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

const index = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, configuration);

export default index;