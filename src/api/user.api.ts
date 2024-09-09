import { IGetUser, ISignUpUser } from "@/types/user";
import { api } from ".";
import { IAuthUserResponse } from "@/types/auth";

export const userEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchMe: builder.query<IGetUser, undefined>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
    }),
    createUser: builder.mutation<IAuthUserResponse, ISignUpUser>({
      query: (body) => ({
        url: `/users`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useFetchMeQuery, useCreateUserMutation } = userEndpoint;
