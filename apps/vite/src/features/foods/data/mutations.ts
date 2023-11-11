import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createFood, Food } from "./database";
import { foodsKeys } from "./queries";

const upsertFoodDetail = (queryClient: QueryClient, food: Food) => {
  const key = foodsKeys.detail(food.id);
  queryClient.setQueryData<Food>(key, (oldState) => {
    if (!oldState) return food;
    return { ...oldState, ...food };
  });
};
export const useCreateFood = (options: any = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...opts } = options;

  return useMutation<Food>({
    mutationFn: async (fields: any) => {
      const response = await createFood(fields);
      return response?.data;
    },
    onSuccess: (...args) => {
      const [response] = args;

      queryClient.invalidateQueries({ queryKey: foodsKeys.list() });
      upsertFoodDetail(queryClient, response);

      onSuccess && onSuccess(...args);
    },
    ...opts,
  });
};
