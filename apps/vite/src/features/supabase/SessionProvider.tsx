import { useEffect, useMemo, useState } from "react";
import { supabase } from "./supabaseClient";
import { SessionContext } from "./sessionContext";

export default function SessionProvider({ children }: any) {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession((oldSession: any) => {
        if (event === "SIGNED_OUT") return null;
        if (!newSession) return oldSession;

        const isSignedInEvent = event === "SIGNED_IN";
        const isAccessTokenNew =
          newSession.access_token != oldSession?.access_token;
        const canSetWhenSignedIn =
          isSignedInEvent && (!oldSession || isAccessTokenNew);
        const canSetNewSession = !isSignedInEvent || canSetWhenSignedIn;

        if (canSetNewSession) {
          return newSession;
        }
        return oldSession;
      });
    });

    return () => data.subscription.unsubscribe();
  }, []);

  const contextValue = useMemo(() => ({ session }), [session]);

  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
}
