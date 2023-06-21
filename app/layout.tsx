import Header from "$components/layout/Header";
import GlobalProvider from "$context/GlobalProvider";
import "@/app/globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "online store",
  description: "e-commerce web application build with nextjs",
};

export default function ({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <link
          key="font-awesome"
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        />
        <GlobalProvider>
          <Header />
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}
