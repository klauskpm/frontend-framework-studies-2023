import { DEFAULT_CACHE_TIME } from "../../../config";
import { Food, getFood, getFoods, getPaginatedFoods } from "./database";
import { keepPreviousData, QueryClient, useQuery } from "@tanstack/react-query";

export const foodsKeys = {
  all: () => ["foods"],
  list: () => [...foodsKeys.all(), "list"],
  detail: (id: number) => [...foodsKeys.all(), "detail", id],
  paginated: (page: number, itemsPerPage: number) => [
    ...foodsKeys.list(),
    { page, itemsPerPage },
  ],
};

export const useFoodsQuery = (options = {}) => {
  return useQuery({
    queryKey: foodsKeys.list(),
    queryFn: async () => {
      const response = await getFoods();
      return response.data;
    },
    staleTime: DEFAULT_CACHE_TIME,
    placeholderData: [],
    ...options,
  });
};

const defaultPaginationOptions = {
  page: 0,
  itemsPerPage: 10,
};
export const useFoodsPaginatedQuery = (options = defaultPaginationOptions) => {
  const { page, itemsPerPage, ...opts } = options;
  return useQuery({
    queryKey: foodsKeys.paginated(page, itemsPerPage),
    queryFn: () => getPaginatedFoods({ page, itemsPerPage }),
    staleTime: DEFAULT_CACHE_TIME,
    placeholderData: keepPreviousData,
    ...opts,
  });
};

const getFoodDetails = async (id: number) => {
  const response = await getFood(id);
  return response.data;
};

export const useFoodDetailQuery = (options: any = {}) => {
  const { id, ...opts } = options;
  return useQuery<Food | null>({
    queryKey: foodsKeys.detail(id),
    queryFn: () => getFoodDetails(id),
    staleTime: DEFAULT_CACHE_TIME,
    placeholderData: null,
    ...opts,
  });
};

export const prefetchFoodDetailQuery = (
  queryClient: QueryClient,
  id: number,
) => {
  queryClient.prefetchQuery({
    queryKey: foodsKeys.detail(id),
    queryFn: () => getFoodDetails(id),
    staleTime: 30 * 1000,
  });
};
