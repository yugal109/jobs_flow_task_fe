"use client";

import { PATH_SIGN_IN } from "@/config-global";
import { eraseUser } from "@/slices/auth.slice";
import { persistor, useAppDispatch } from "@/store";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const signOut = () => {
    persistor.purge();
    dispatch(eraseUser());
    router.replace(PATH_SIGN_IN);
    router.refresh();
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>HOME PAGE</h1>
      <Button onClick={signOut}>Sign out</Button>
    </div>
  );
}
