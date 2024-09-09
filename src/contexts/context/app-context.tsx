"use client";

import { IAuthUserResponse } from "@/types/auth";
import { createContext } from "react";
//

// ----------------------------------------------------------------------

export type AppContextType = {
  user: null | IAuthUserResponse;
  authenticated: boolean;
  loading: boolean;
};

export const AppContext = createContext({} as AppContextType);
