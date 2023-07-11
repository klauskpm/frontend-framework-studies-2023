import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import Routes from "./routes";
import SessionProvider from "./features/supabase/SessionProvider";
import { ToastProvider } from "@shared/react-ui";
import ContentBlocker from "./ContentBlocker";
import { DVCProvider } from "@devcycle/devcycle-react-sdk";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const dvcConfig = { sdkKey: import.meta.env.VITE_DVC_SDK_KEY };
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <ToastProvider>
          <DVCProvider config={dvcConfig}>
            <ContentBlocker>
              <Routes />
            </ContentBlocker>
          </DVCProvider>
        </ToastProvider>
      </SessionProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
