import { useLoaderData, useParams } from "react-router-dom";

import Card from "../../components/Card";
import FoodForm from "../../features/foods/components/FoodForm";
import { Food, getFood, updateFood } from "../../features/foods/data/database";

export default function EditFood() {
  const food = useLoaderData() as Food | null;
  const { id } = useParams<{ id: string }>();
  const handleSubmit = (fields: any) => {
    updateFood(Number(id), fields);
  };

  return (
    <div className="m-8">
      <h2 className="text-3xl font-bold mb-4">Edit food</h2>
      <Card>
        <div className="card-body">
          <FoodForm
            onSubmit={handleSubmit}
            buttonText="Update food"
            food={food}
          />
        </div>
      </Card>
    </div>
  );
}

export const foodLoader = async ({ params }: any): Promise<Food|null> => {
  const { id } = params;
  const { data } = await getFood(Number(id));

  return data;
}