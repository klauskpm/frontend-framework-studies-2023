import { createContext } from "react";

export type SessionContextType = {
  session: any;
};

export const initialSessionContext: SessionContextType = {
  session: null,
};
export const SessionContext = createContext<SessionContextType>(
  initialSessionContext
);
