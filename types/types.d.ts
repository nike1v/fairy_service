import { PrismaClient } from "@prisma/client";
import { FieldError } from "react-hook-form";

type Inputs = {
  firstName: string,
  lastName: string,
	email: string,
	phone: string,
	password: string,
	confirmPassword: string,
	acceptRules: boolean,
};

type InputsErrors = {
	firstName?: FieldError | undefined,
  lastName?: FieldError | undefined,
	email?: FieldError | undefined,
	phone?: FieldError | undefined,
	password?: FieldError | undefined,
	confirmPassword?: FieldError | undefined,
	acceptRules?: FieldError | undefined,
}

type fieldName = "firstName" | "lastName" | "email" | "phone" | "password" | "confirmPassword" | "acceptRules";

declare module "*.pdf";

type UserAccountType = {
	clientId: number;
	firstName?: string;
	lastName?: string;
	email?: string;
	phone?: string;
	isActive?: string;
	admin: boolean;
}

declare global {
	var db: PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>;
}

type OrderClientType = {
	orderId: number;
	date: string;
	time: string;
	service: string;
	staff: string;
	status: string;
	client: {
		name: string;
		phone: string;
	};
}

type UserClientType = {
	firstName: string;
	lastName?: string;
	phone: string;
	email: string;
	admin: boolean;
}

type OrdersType = {
  orderId: number;
  date: Date;
  status: string;
  serviceId?: number;
  staffId?: number;
  clientId?: number;
	service: {
		title: string
	};
	staff: {
		firstName: string;
	};
	client: {
		firstName: string;
		lastName: string;
		phone: string;
	};
}

type EditUser = {
	clientId: number
} & Inputs;