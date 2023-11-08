import { DEFAULT_CACHE_TIME } from "../../../config";
import { getFoods, getPaginatedFoods } from "./database";
import { useQuery } from "@tanstack/react-query";

export const foodsKeys = {
  all: () => ["foods"],
  list: () => [...foodsKeys.all(), "list"],
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
    keepPreviousData: true,
    ...opts,
  });
};
