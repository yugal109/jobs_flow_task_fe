import { useTypedSelector } from "@/store";
import { selectIsAppLoading } from "../slices/layout.slice";

export const useIsAppLoading = () => useTypedSelector(selectIsAppLoading);
