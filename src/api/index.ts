import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

// eslint-disable-next-line import/no-cycle
import { RootState } from "@/store";

const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const baseResult = await fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.user?.token;
      if (token) {
        headers.set("x-auth-token", `${token}`);
      }
    },
    credentials: "include",
  })(args, api, extraOptions);

  if (baseResult.meta?.response?.status === 403) {
    /// HANDLE AUTO LOGOUT LATER ON.
  }

  return baseResult;
};

export const api = createApi({
  baseQuery: customBaseQuery,
  endpoints: () => ({}),
  tagTypes: ["user", "auth"],
});
