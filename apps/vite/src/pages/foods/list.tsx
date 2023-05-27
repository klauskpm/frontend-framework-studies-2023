import { useEffect, useMemo, useState } from "react";
import { Food, getFoods } from "../../features/foods/data/database";
import VirtualList from "../../components/VirtualList";

export default function FoodList() {
    const [foods, setFoods] = useState<Food[]>([]);

    const multipleFoods = useMemo(() => {
        if (!foods.length) return [];
        return Array.from({ length: 1000 }, (_, i) => foods[i%foods.length]);
    }, [foods]);

    useEffect(() => {
        getFoods().then(({ data }) => {
        if (!data) return;
        setFoods(data);
        });
    }, []);

    return <VirtualList items={multipleFoods} />;
    }