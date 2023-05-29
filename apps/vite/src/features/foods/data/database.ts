import { supabase } from "../../supabase/supabaseClient";
import { Database } from "../../supabase/generated-types";
import { SelectOptions } from "../../supabase/types";

export type Food = Database["public"]["Tables"]["foods"]["Row"];


export function getFoods(options?: SelectOptions) {
  return supabase.from("foods").select("*", options);
}

export function getFood (id: number) {
  return getFoods().eq("id", id).single();
}

export async function getPaginatedFoods({ page, itemsPerPage }: { page: number, itemsPerPage: number}) {
  const initialItem = page * itemsPerPage;
  const finalItem = initialItem + itemsPerPage - 1;
  const countResponse = await getFoods({ count: 'exact', head: true });
  const paginatedFoodsResponse = await getFoods().order('id').range(initialItem, finalItem);

  return {
    data: paginatedFoodsResponse.data,
    count: countResponse.count,
    error: paginatedFoodsResponse.error && countResponse.error,
  };
}

export function createFood(fields: any) {
  return supabase.from("foods").insert([fields]);
};

export function updateFood(id: number, fields: any) {
  return supabase
    .from("foods")
    .update(fields)
    .eq("id", id);
};

export function deleteFood(id: number) {
  return supabase.from("foods").delete().eq("id", id);
}