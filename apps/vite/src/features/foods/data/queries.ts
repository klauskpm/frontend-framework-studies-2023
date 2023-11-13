import { DEFAULT_CACHE_TIME } from "../../../config";
import { Food, getFood, getFoods, getPaginatedFoods } from "./database";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

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

export const useFoodDetailQuery = (options: any = {}) => {
  const { id, ...opts } = options;
  return useQuery<Food | null>({
    queryKey: foodsKeys.detail(id),
    queryFn: async () => {
      const response = await getFood(id);
      return response.data;
    },
    staleTime: DEFAULT_CACHE_TIME,
    placeholderData: null,
    ...opts,
  });
};
