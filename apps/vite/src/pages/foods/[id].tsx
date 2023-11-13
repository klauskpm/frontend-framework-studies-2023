import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useVariableValue } from "@devcycle/react-client-sdk";

import { Card, ToastSuccess } from "@shared/react-ui";
import FoodForm from "../../features/foods/components/FoodForm";
import { Food } from "../../features/foods/data/database";
import {
  FoodUpdateInput,
  useUpdateFood,
} from "../../features/foods/data/mutations";

export default function EditFood() {
  const navigate = useNavigate();
  const food = useLoaderData() as Food | null;
  const [message, setMessage] = useState("");
  const canSeeFoods = useVariableValue("foods", false);

  const updateMutation = useUpdateFood({
    onAfterSuccess: () => {
      setMessage("Food updated successfully");
    },
  });

  const handleSubmit = async (fields: any) => {
    if (!food) return;
    const input: FoodUpdateInput = { id: food?.id, fields };
    updateMutation.mutate(input);
  };

  if (!canSeeFoods) {
    navigate("/");
    return null;
  }

  return (
    <div className="m-8">
      <h2 className="mb-4 text-3xl font-bold">Edit food</h2>
      <Card>
        <div className="card-body">
          <FoodForm
            onSubmit={handleSubmit}
            buttonText="Update food"
            food={food}
            loading={updateMutation.isPending}
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
