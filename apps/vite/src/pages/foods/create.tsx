import { useState } from "react";
import { useVariableValue } from "@devcycle/react-client-sdk";
import { useNavigate } from "react-router-dom";

import { Card, ToastSuccess } from "@shared/react-ui";
import FoodForm from "../../features/foods/components/FoodForm";
import { useCreateFood } from "../../features/foods/data/mutations";
import { Food } from "../../features/foods/data/database";

export default function CreateFoods() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const canSeeFoods = useVariableValue("foods", false);
  const createFood = useCreateFood({
    onSuccess: (response: Food) => {
      setMessage("Food created successfully");
      navigate(`/foods/${response.id}`);
    },
  });

  const handleSubmit = async (fields: any) => {
    createFood.mutate(fields);
  };

  if (!canSeeFoods) {
    navigate("/");
    return null;
  }

  return (
    <div className="m-8">
      <h2 className="mb-4 text-3xl font-bold">New food</h2>
      <Card>
        <div className="card-body">
          <FoodForm
            onSubmit={handleSubmit}
            buttonText="Create food"
            loading={createFood.isLoading}
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
