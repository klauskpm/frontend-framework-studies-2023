import Card from "../../components/Card";
import FoodForm from "../../features/foods/components/FoodForm";
import { createFood } from "../../features/foods/data/create-foods";

export default function CreateFoods() {
  return (
    <div className="m-8">
      <h2 className="text-3xl font-bold mb-4">New food</h2>
      <Card>
        <div className="card-body">
          <FoodForm onSubmit={createFood} buttonText="Create food" />
        </div>
      </Card>
    </div>
  );
}
