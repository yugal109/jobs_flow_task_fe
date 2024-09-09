"use client";

import React, { useEffect, useMemo } from "react";
import { useIsAppLoading } from "@/hooks/use-is-app-loading";
import { useDispatch } from "react-redux";
import { setIsAppLoading } from "@/slices/layout.slice";
import { useGetCurrentUser } from "@/hooks/use-get-current-user";
import { redirect, usePathname, useRouter } from "next/navigation";
import {
  ALLOWED_PATHS,
  PATH_AFTER_SIGN_IN,
  PATH_SIGN_IN,
} from "@/config-global";

import { useFetchMeQuery } from "@/api/user.api";
import { AppContext } from "./app-context";

type Props = {
  children: React.ReactNode;
};

export function AppProvider({ children }: Props) {
  const dispatch = useDispatch();
  const path = usePathname();
  const isAppLoading = useIsAppLoading();
  const currentUser = useGetCurrentUser();
  const router = useRouter();

  const { isLoading, isError } = useFetchMeQuery(undefined);
  // Run effect only once on component mount

  useEffect(() => {
    if (isError) {
      if (!ALLOWED_PATHS.includes(path)) {
        router.replace(PATH_SIGN_IN);
      }
      dispatch(setIsAppLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, router, dispatch]);

  useEffect(() => {
    if (isError === false && isLoading === false) {
      if (ALLOWED_PATHS.includes(path)) {
        redirect(PATH_AFTER_SIGN_IN);
      } else {
        router.push(path);
        dispatch(setIsAppLoading(false));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, router, dispatch, isLoading]);

  useEffect(() => {
    if (!currentUser) {
      if (!ALLOWED_PATHS.includes(path)) {
        router.replace(PATH_SIGN_IN);
      } else {
        router.push(path);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, router]);

  const value = useMemo(
    () => ({
      user: currentUser,
      loading: isAppLoading || isLoading,
      authenticated: false,
    }),
    [isAppLoading, currentUser, isLoading]
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
