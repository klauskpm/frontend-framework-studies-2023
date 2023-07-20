import { getFoods } from "../../features/foods/data/database";
import { VirtualList } from "@shared/react-ui";
import { useQuery } from "@tanstack/react-query";

export default function FoodList() {
  const multipleFoodsQuery = useQuery({
    queryKey: ["foods", "list"],
    queryFn: async () => {
      const { data } = await getFoods();
      if (!data?.length) return [];
      return Array.from({ length: 1000 }, (_, i) => data[i % data.length]);
    },
    initialData: [],
  });

  return (
    <div className="px-4 py-2">
      <VirtualList items={multipleFoodsQuery.data} />
    </div>
  );
}
