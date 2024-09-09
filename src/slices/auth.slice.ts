import { IAuthUserResponse } from "@/types/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// eslint-disable-next-line import/no-cycle

const SLICE_NAME = "auth";

export type AuthState = {
  user: IAuthUserResponse | null;
  authenticated: boolean | null;
};
export type AuthStateSlice = { [SLICE_NAME]: AuthState };

export const authSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    user: null,
    authenticated: null,
  } as AuthState,
  reducers: {
    setUser: (state, action: PayloadAction<IAuthUserResponse>) => {
      state.user = action.payload;
      state.authenticated = true;
    },
    eraseUser: (state) => {
      state.user = null;
      state.authenticated = false;
    },
  },
});

export const { setUser, eraseUser } = authSlice.actions;

export const selectCurrentUser = (state: AuthStateSlice) => state.auth.user;
