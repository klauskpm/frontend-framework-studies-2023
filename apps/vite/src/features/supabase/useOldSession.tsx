import { useContext } from "react";
import { initialSessionContext, SessionContext } from "./sessionContext";

export const useOldSession = () => {
  const context = useContext(SessionContext);
  const { session, setSession } = context;

  if (context === initialSessionContext) {
    throw new Error("useOldSession must be used within a SessionProvider");
  }

  return [session, setSession];
};
