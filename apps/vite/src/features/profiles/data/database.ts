import { Database } from "../../supabase/generated-types";
import { supabase } from "../../supabase/supabaseClient";
import { SelectOptions } from "../../supabase/types";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export function getProfiles(options?: SelectOptions) {
    return supabase.from("profiles").select("*", options);
}

export function getProfile(id: number) {
    return getProfiles().eq("id", id).single();
}

export function updateProfile(id: number, fields: any) {
    return supabase
      .from("profiles")
      .update(fields)
      .eq("id", id);
};