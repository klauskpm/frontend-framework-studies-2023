import {
  DefaultError,
  MutationOptions,
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createFood, Food, updateFood } from "./database";
import { foodsKeys } from "./queries";

type CustomMutationOptions<TData, TVariables> = MutationOptions<
  TData | null,
  DefaultError,
  TVariables
> & {
  onAfterSuccess?: (
    data: TData,
    variables: TVariables,
    context: unknown,
  ) => void;
};

export type CreateFoodInput = Exclude<Food, "id">;

const upsertFoodDetail = (queryClient: QueryClient, food?: Food) => {
  if (!food) return;
  const key = foodsKeys.detail(food.id);
  queryClient.setQueryData<Food>(key, (oldState) => {
    if (!oldState) return food;
    return { ...oldState, ...food };
  });
};

export const useCreateFood = (
  options: CustomMutationOptions<Food, CreateFoodInput> = {},
) => {
  const queryClient = useQueryClient();
  const { onAfterSuccess, ...opts } = options;

  return useMutation({
    mutationFn: async (fields) => {
      const response = await createFood(fields);
      return response?.data;
    },
    onSuccess: (data, variables, context) => {
      if (!data) return;

      queryClient.invalidateQueries({ queryKey: foodsKeys.list() });
      upsertFoodDetail(queryClient, data);

      onAfterSuccess && onAfterSuccess(data, variables, context);
    },
    ...opts,
  });
};

export type FoodUpdateInput = {
  id: number;
  fields: Partial<Food>;
};

export function useUpdateFood(
  options: CustomMutationOptions<Food, FoodUpdateInput> = {},
) {
  const queryClient = useQueryClient();
  const { onAfterSuccess, ...opts } = options;

  return useMutation({
    mutationFn: async ({ id, fields }) => {
      const response = await updateFood(id, fields);
      return response?.data;
    },
    onSuccess: (data, variables, context) => {
      if (!data) return;

      queryClient.invalidateQueries({ queryKey: foodsKeys.list() });
      upsertFoodDetail(queryClient, data);

      onAfterSuccess && onAfterSuccess(data, variables, context);
    },
    ...opts,
  });
}
