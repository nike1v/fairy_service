import NextAuth, { User } from "next-auth";

declare module "next-auth" {
  interface User {
		clientId: number,
		firstName?: string | undefined,
		lastName?: string | undefined,
		email?: string | undefined,
		phone?: string | undefined,
		isActive?: string | undefined,
		admin: boolean
	}

	interface Session {
		session: Session,
		token: JWT
	}

}

// declare module "next-auth/react" {
	
// 	interface SignInOptions {
// 		user: User,
// 	} & DefaultSession[""]
// }

declare module "next-auth/jwt" {
	interface DefaultJWT {
		token: JWT,
		user: User
	}
}