import { getFoods } from "../../features/foods/data/database";
import { VirtualList } from "@shared/react-ui";
import { useQuery } from "@tanstack/react-query";
import { DEFAULT_CACHE_TIME } from "../../config";

export default function FoodList() {
  const multipleFoodsQuery = useQuery({
    queryKey: ["foods", "list", "infinite"],
    queryFn: async () => {
      const { data } = await getFoods();
      if (!data?.length) return [];
      return Array.from({ length: 1000 }, (_, i) => data[i % data.length]);
    },
    placeholderData: [],
    staleTime: DEFAULT_CACHE_TIME,
  });

  return (
    <div className="px-4 py-2">
      <VirtualList items={multipleFoodsQuery.data} />
    </div>
  );
}
