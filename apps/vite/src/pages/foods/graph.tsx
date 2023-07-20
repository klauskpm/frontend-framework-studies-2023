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
import { getFoods } from "../../features/foods/data/database";
import { useQuery } from "@tanstack/react-query";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
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
    queryKey: ["foods"],
    queryFn: async () => getFoods().then((res) => res.data),
  });

  const foods = useMemo(() => foodsQuery?.data ?? [], [foodsQuery.data]);

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
