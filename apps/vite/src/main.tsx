import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import Routes from "./routes";
import SessionProvider from "./SessionProvider";
import ToastProvider from "./components/ToastProvider";
import FeatureFlagsProvider from "./FeatureFlagsProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SessionProvider>
      <ToastProvider>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <FeatureFlagsProvider>
          <Routes />
        </FeatureFlagsProvider>
      </ToastProvider>
    </SessionProvider>
  </React.StrictMode>
);
