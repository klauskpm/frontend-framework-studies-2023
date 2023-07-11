import { Database } from "../../supabase/generated-types";
import { supabase } from "../../supabase/supabaseClient";
import { SelectOptions } from "../../supabase/types";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export function getProfiles(options?: SelectOptions) {
  return supabase.from("profiles").select("*", options);
}

export async function getProfile(id: string) {
  return getProfiles().eq("id", id).single();
}

export async function updateProfile(id: string, fields: any) {
  return supabase.from("profiles").update(fields).eq("id", id);
}
