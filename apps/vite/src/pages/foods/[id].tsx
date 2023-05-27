import { useParams } from "react-router-dom";
import FoodForm from "../../features/foods/components/FoodForm";
import Card from "../../components/Card";
import { Food, getFood, updateFood } from "../../features/foods/data/database";
import { useEffect, useState } from "react";

export default function EditFood() {
  const [isLoading, setLoading] = useState(true);
  const [food, setFood] = useState<Food|null>(null);
  const { id } = useParams<{ id: string }>();
  const handleSubmit = (fields: any) => {
    updateFood(Number(id), fields);
  };

  useEffect(() => {
    if (!id) return;
    getFood(Number(id)).then(({ data }) => {
      if (!data) return;
      console.log('data', data)
      setFood(data);
      setLoading(false);
    });
  }, [id]);

  return (
    <div className="m-8">
      <h2 className="text-3xl font-bold mb-4">Edit food</h2>
      <Card>
        <div className="card-body">
          <FoodForm
            onSubmit={handleSubmit}
            buttonText="Update food"
            food={food}
            isLoading={isLoading}
          />
        </div>
      </Card>
    </div>
  );
}
