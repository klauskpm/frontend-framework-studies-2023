import { supabase } from "../../../supabaseClient";

export const updateFood = async (id: number, fields: any) => {
    return supabase
      .from("foods")
      .update(fields)
      .eq("id", id);
  };