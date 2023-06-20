import { AxisOptions, Chart } from "react-charts";
import Card from "../../components/Card";

type DailyStars = {
  name: string;
  price: number;
};

type Series = {
  label: string;
  data: DailyStars[];
};

const data: Series[] = [
  {
    label: "Price",
    data: [
      {
        name: "Naan",
        price: 12,
      },
      {
        name: "Roti",
        price: 13,
      },
      // ...
    ],
  },
];

const primaryAxis: AxisOptions<DailyStars> = {
  // position: "left",
  getValue: (datum) => datum.name,
  styles: {
    backgroundColor: "red",
  },
};

const secondaryAxes: AxisOptions<DailyStars>[] = [
  {
    // position: "bottom",
    getValue: (datum) => datum.price,
    styles: {
      backgroundColor: "red",
    },
    elementType: "bar",
    min: 0,
  },
];

export default function FoodChart() {
  return (
    <Card>
      <div className="m-4 h-96 w-96 bg-white">
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
          }}
        />
      </div>
    </Card>
  );
}
