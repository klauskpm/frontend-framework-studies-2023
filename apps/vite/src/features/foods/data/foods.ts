import { supabase } from "../../../supabaseClient";
import { Database } from "../../../../supabase";

export type Food = Database["public"]["Tables"]["foods"]["Row"];
export type SelectOptions = { head?: boolean | undefined; count?: "exact" | "planned" | "estimated" | undefined; } | undefined;


export function getFoods(options?: SelectOptions) {
  return supabase.from("foods").select("*", options);
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

export async function deleteFood(id: number) {
  const { data, error } = await supabase.from("foods").delete().eq("id", id);

  if (error) {
    throw error;
  } else {
    return data;
  }
}