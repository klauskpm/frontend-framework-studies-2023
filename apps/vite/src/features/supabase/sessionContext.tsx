import { createContext, Dispatch } from "react";

export type SessionContextType = {
  session: any;
  setSession: Dispatch<any>;
};

export const initialSessionContext: SessionContextType = {
  session: null,
  setSession: () => null,
};
export const SessionContext = createContext<SessionContextType>(
  initialSessionContext
);
