import { Food } from "../../features/foods/data/database";
import { VirtualList } from "@shared/react-ui";
import { useFoodsQuery } from "../../features/foods/data/queries";

export default function FoodList() {
  const multipleFoodsQuery = useFoodsQuery({
    select: (foods: Food[]) => {
      if (!foods?.length) return [];
      return Array.from({ length: 1000 }, (_, i) => foods[i % foods.length]);
    },
  });

  return (
    <div className="px-4 py-2">
      <VirtualList items={multipleFoodsQuery.data} />
    </div>
  );
}
