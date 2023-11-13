import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createFood, Food, updateFood } from "./database";
import { foodsKeys } from "./queries";

export type CreateFoodInput = Exclude<Food, "id">;

const upsertFoodDetail = (queryClient: QueryClient, food?: Food) => {
  if (!food) return;
  const key = foodsKeys.detail(food.id);
  queryClient.setQueryData<Food>(key, (oldState) => {
    if (!oldState) return food;
    return { ...oldState, ...food };
  });
};

export const useCreateFoodMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Food | null, Error, CreateFoodInput>({
    mutationFn: async (fields) => {
      const response = await createFood(fields);
      return response?.data;
    },
    onSuccess: (data) => {
      if (!data) return;

      queryClient.invalidateQueries({ queryKey: foodsKeys.list() });
      upsertFoodDetail(queryClient, data);
    },
  });
};

export type FoodUpdateInput = {
  id: number;
  fields: Partial<Food>;
};

export function useUpdateFoodMutation() {
  const queryClient = useQueryClient();

  return useMutation<Food | null, Error, FoodUpdateInput>({
    mutationFn: async ({ id, fields }) => {
      const response = await updateFood(id, fields);
      return response?.data;
    },
    onSuccess: (data) => {
      if (!data) return;

      queryClient.invalidateQueries({ queryKey: foodsKeys.list() });
      upsertFoodDetail(queryClient, data);
    },
  });
}
