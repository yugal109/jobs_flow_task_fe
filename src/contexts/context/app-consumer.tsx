"use client";

import { SplashScreen } from "@/components/loading-screen/splash-screen";
import { AppContext } from "./app-context";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function AppConsumer({ children }: Props) {
  return (
    <AppContext.Consumer>
      {(ctx) => (ctx.loading ? <SplashScreen /> : children)}
    </AppContext.Consumer>
  );
}
