import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/contexts/provider/redux-provider";
import { AppProvider } from "@/contexts/context/app-provider";
import { AppConsumer } from "@/contexts/context/app-consumer";

export const metadata: Metadata = {
  title: "Job Wise",
  description: "Job wise",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <AppProvider>
            <AppConsumer>{children}</AppConsumer>
          </AppProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
