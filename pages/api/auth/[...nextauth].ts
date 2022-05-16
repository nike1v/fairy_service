import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { UserAccountType } from "../../../types/types";
import { JWT } from "next-auth/jwt";
import { SessionStore } from "next-auth/core/lib/cookie";
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
    jwt: true,
    maxAge: 30 * 24 * 60 * 60
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
    async signIn(user: any, account: any, profile: any) {
      try {
        //the user object is wrapped in another user object so extract it
        user = user.user;
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
    async session(session: any, token: JWT) {
      if (userAccount !== null) {
        //session.user = userAccount;
        session.user = {
          userId: userAccount.clientId,
          name: `${userAccount.firstName} ${userAccount.lastName}`,
          email: userAccount.email
        };
      } else if (typeof token.user !== typeof undefined && (typeof session.user === typeof undefined || (typeof session.user !== typeof undefined && typeof session.user.userId === typeof undefined))) {
        session.user = token.user;
      } else if (typeof token !== typeof undefined) {
        session.token = token;
      }
      return session;
    },
    async jwt(token: JWT, user: any, account: any, profile: any, isNewUser: any) {
      console.log("JWT callback. Got User: ", user);
      if (typeof user !== typeof undefined) {
        token.user = user;
      }
      return token;
    }
  }
};

const index = (req: any, res: any) => NextAuth({...req, ...res, ...configuration});

export default index;