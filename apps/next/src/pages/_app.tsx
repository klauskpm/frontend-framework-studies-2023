import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { MyComponent, LoginPage } from "@shared/simple";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <LoginPage />
      <Component {...pageProps} />
    </>
  );
}
