import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export function useSession(startingSession: any = null) {
  const [session, setSession] = useState<any>(startingSession);

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

  return [session, setSession];
}
