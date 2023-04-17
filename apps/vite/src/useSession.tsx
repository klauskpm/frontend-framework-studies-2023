import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export function useSession(startingSession: any = null) {
  const [session, setSession] = useState<any>(startingSession);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return [session, setSession];
}
