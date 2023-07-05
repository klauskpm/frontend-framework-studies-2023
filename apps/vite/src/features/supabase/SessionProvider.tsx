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
      if (event === "SIGNED_OUT") return setSession(null);
      if (!newSession) return;

      setSession((oldSession: any) => {
        const isEventSignedIn = event === "SIGNED_IN";
        const hasNewSession =
          !!newSession?.access_token &&
          newSession.access_token != oldSession?.access_token;
        const isNewSession = isEventSignedIn && hasNewSession;
        const canSetNewSession = !isEventSignedIn || isNewSession;

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
