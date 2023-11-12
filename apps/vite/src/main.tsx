import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { DevCycleProvider } from "@devcycle/react-client-sdk";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ToastProvider } from "@shared/react-ui";
import SessionProvider from "./features/supabase/SessionProvider";
import Routes from "./routes";
import ContentBlocker from "./ContentBlocker";

const dvcConfig = { sdkKey: import.meta.env.VITE_DVC_SDK_KEY };
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <ToastProvider>
          <DevCycleProvider config={dvcConfig}>
            <ContentBlocker>
              <Routes />
            </ContentBlocker>
            <ReactQueryDevtools initialIsOpen={false} />
          </DevCycleProvider>
        </ToastProvider>
      </SessionProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
