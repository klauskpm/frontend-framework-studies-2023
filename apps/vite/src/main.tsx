import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import Routes from "./routes";
import SessionProvider from "./features/supabase/SessionProvider";
import { ToastProvider } from "@shared/react-ui";
import FeatureFlagsProvider from "./FeatureFlagsProvider";
import { DVCProvider } from "@devcycle/devcycle-react-sdk";

const dvcConfig = { sdkKey: import.meta.env.VITE_DVC_SDK_KEY };

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SessionProvider>
      <ToastProvider>
        <DVCProvider config={dvcConfig}>
          <FeatureFlagsProvider>
            <Routes />
          </FeatureFlagsProvider>
        </DVCProvider>
      </ToastProvider>
    </SessionProvider>
  </React.StrictMode>
);
