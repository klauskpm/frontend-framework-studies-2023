import Card from "../../components/Card";
import FoodForm from "../../features/foods/components/FoodForm";
import {createFood} from "../../features/foods/data/database";
import {useState} from "react";

export default function CreateFoods() {
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (fields: any) => {
        setLoading(true);
        await createFood(fields);
        setLoading(false);
    };

  return (
    <div className="m-8">
      <h2 className="text-3xl font-bold mb-4">New food</h2>
      <Card>
        <div className="card-body">
          <FoodForm onSubmit={handleSubmit} buttonText="Create food" loading={loading} />
        </div>
      </Card>
    </div>
  );
}
