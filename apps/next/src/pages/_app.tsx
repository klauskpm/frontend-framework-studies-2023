import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { foo, bar, MyComponent } from "@shared/simple";

console.log(foo);
bar();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <MyComponent />
      <Component {...pageProps} />
    </>
  );
}
