import React from "react";
import { Triangle } from "react-loader-spinner";

export const SplashScreen = () => (
  <div className="flex h-screen items-center justify-center">
    <div className="rounded-lg">
      <Triangle
        visible
        height="200"
        width="200"
        color="white"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  </div>
);
