import { createContext } from "react";

export interface SessionContextType {
  session: any;
  fetched: boolean;
}

export const SessionContext = createContext<SessionContextType | null>(null);
