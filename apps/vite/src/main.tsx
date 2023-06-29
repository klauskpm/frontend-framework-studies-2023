import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import Routes from "./routes";
import SessionProvider from "./SessionProvider";
import ToastProvider from "./components/ToastProvider";
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
