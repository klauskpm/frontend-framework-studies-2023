import { Database } from "../supabase";
import { supabase } from "./supabaseClient";

export type Country = Database["public"]["Tables"]["countries"]["Row"];

export async function getCountries() {
  return supabase.from("countries").select();
}
