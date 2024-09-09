import { ISignInUser, IAuthUserResponse } from "@/types/auth";
import { api } from ".";

export const authEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<IAuthUserResponse, ISignInUser>({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSignInMutation } = authEndpoint;
