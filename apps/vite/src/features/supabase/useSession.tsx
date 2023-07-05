import { useContext } from "react";
import { initialSessionContext, SessionContext } from "./sessionContext";

export const useSession = () => {
  const context = useContext(SessionContext);
  const { session } = context;

  if (context === initialSessionContext) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return { session };
};
