import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import colors from "tailwindcss/colors";
import { useMemo } from "react";
import { Food, getFoods } from "../../features/foods/data/database";
import { useQuery } from "@tanstack/react-query";
import { DEFAULT_CACHE_TIME } from "../../config";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Food Graph",
    },
  },
};

export default function FoodGraph() {
  const foodsQuery = useQuery({
    queryKey: ["foods", "list"],
    queryFn: () => getFoods().then((res) => res.data ?? []),
    placeholderData: [],
    staleTime: DEFAULT_CACHE_TIME,
  });

  const foods = foodsQuery.data as Food[];

  const data = useMemo(() => {
    const labels: string[] = foods.map((food) => food.title);
    const dataset = {
      label: "Prices",
      backgroundColor: colors.cyan[500],
      data: foods.map((food) => food.price),
    };
    return { labels, datasets: [dataset] };
  }, [foods]);

  return (
    <div className="rounded-xl bg-white">
      <Bar options={options} data={data} />
    </div>
  );
}
