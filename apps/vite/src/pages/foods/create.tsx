import {useState} from "react";

import Card from "../../components/Card";
import FoodForm from "../../features/foods/components/FoodForm";
import {createFood} from "../../features/foods/data/database";
import ToastSuccess from "../../components/ToastSuccess";

export default function CreateFoods() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const handleSubmit = async (fields: any) => {
        setLoading(true);
        await createFood(fields);
        setLoading(false);
        setMessage("Food created successfully");
    };

  return (
    <div className="m-8">
      <h2 className="text-3xl font-bold mb-4">New food</h2>
      <Card>
        <div className="card-body">
          <FoodForm onSubmit={handleSubmit} buttonText="Create food" loading={loading} />
          <ToastSuccess open={!!message} message={message} onClose={() => setMessage("")} />
        </div>
      </Card>
    </div>
  );
}
