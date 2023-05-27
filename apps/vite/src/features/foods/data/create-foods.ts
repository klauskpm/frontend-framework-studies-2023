import { supabase } from "../../../supabaseClient";

export const createFood = async (fields: any) => {
    return supabase.from("foods").insert([fields]);
};