import { useState } from "react";
import { useVariableValue } from "@devcycle/devcycle-react-sdk";
import { useNavigate } from "react-router-dom";

import { Card, ToastSuccess } from "@shared/react-ui";
import FoodForm from "../../features/foods/components/FoodForm";
import { createFood } from "../../features/foods/data/database";

export default function CreateFoods() {
  const navigate = useNavigate();
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
      <h2 className="mb-4 text-3xl font-bold">New food</h2>
      <Card>
        <div className="card-body">
          <FoodForm
            onSubmit={handleSubmit}
            buttonText="Create food"
            loading={loading}
          />
          <ToastSuccess
            open={!!message}
            message={message}
            onClose={() => setMessage("")}
          />
        </div>
      </Card>
    </div>
  );
}