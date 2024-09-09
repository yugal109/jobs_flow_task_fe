import { useMemo } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { selectCurrentUser } from "../slices/auth.slice";

export const useGetCurrentUser = () => {
  const user = useSelector(selectCurrentUser, shallowEqual);
  return useMemo(() => user, [user]);
};
