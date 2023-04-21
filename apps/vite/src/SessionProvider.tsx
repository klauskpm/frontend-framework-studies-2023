import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "./supabaseClient";

type SessionContextType = {
    session: any;
    setSession: Function;
};

const initialSessionContext: SessionContextType = {
    session: null,
    setSession: () => {},
};

const SessionContext = createContext<SessionContextType>(initialSessionContext);

export const useSession = () => {
    const context = useContext(SessionContext);
    const { session, setSession } = context;

    if (context === initialSessionContext) {
        throw new Error("useSession must be used within a SessionProvider");
    }
    
    return [ session, setSession ];
};

export default function SessionProvider ({ children }: any) {
    const [session, setSession] = useState<any>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        });

        supabase.auth.onAuthStateChange((event, newSession) => {
        setSession((oldSession: any) => {
            if (event === "SIGNED_OUT") return null;
            if (!newSession) return oldSession;

            const isSignedInEvent = event === "SIGNED_IN";
            const isAccessTokenNew = newSession.access_token != oldSession?.access_token;
            const canSetWhenSignedIn = isSignedInEvent && (!oldSession || isAccessTokenNew);
            const canSetNewSession = !isSignedInEvent || canSetWhenSignedIn;

            if (canSetNewSession) {
            return newSession;
            }
            return oldSession;
        })  
        });
    }, []);

    const contextValue = useMemo(() => ({ session, setSession }), [session, setSession]);

    return (
        <SessionContext.Provider value={contextValue}>
            {children}
        </SessionContext.Provider>
    );
};