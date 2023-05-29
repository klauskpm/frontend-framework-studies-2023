import { createClient } from "@supabase/supabase-js";
import { Database } from "./types";

export const supabase = createClient<Database>(
  "https://eikzucowzxcedzyckglx.supabase.co",
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
