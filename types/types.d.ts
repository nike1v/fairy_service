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
}