import {useState} from "react";
import {useLoaderData, useParams} from "react-router-dom";

import Card from "../../components/Card";
import FoodForm from "../../features/foods/components/FoodForm";
import {Food, getFood, updateFood} from "../../features/foods/data/database";
import ToastSuccess from "../../components/ToastSuccess";

export default function EditFood() {
  const food = useLoaderData() as Food | null;
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const handleSubmit = async (fields: any) => {
    setLoading(true);
    await updateFood(Number(id), fields);
    setLoading(false);
    setMessage("Food updated successfully");
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
            loading={loading}
          />
          <ToastSuccess open={!!message} message={message} onClose={() => setMessage("")} />
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