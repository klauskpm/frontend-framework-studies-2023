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

import Card from "../../components/Card";
import colors from "tailwindcss/colors";

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

const labels = ["Naan", "Roti"];

const data = {
  labels,
  datasets: [
    {
      label: "Prices",
      data: [12, 13],
      backgroundColor: colors.cyan[500],
    },
  ],
};

export default function FoodChart() {
  return (
    <Card>
      <div className="rounded-xl bg-white">
        <Bar options={options} data={data} />
      </div>
    </Card>
  );
}
