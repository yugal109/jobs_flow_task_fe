import { SignInUserSchema } from "@/app/(auth)/sign-up/page";

export interface IGetUser {
  email: string;
  firstName: string;
  lastName: string;
}

export interface ISignUpUser extends SignInUserSchema {}
