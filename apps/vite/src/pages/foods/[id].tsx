import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useVariableValue } from "@devcycle/react-client-sdk";

import { Card, ToastSuccess } from "@shared/react-ui";
import FoodForm from "../../features/foods/components/FoodForm";
import {
  FoodUpdateInput,
  useUpdateFoodMutation,
} from "../../features/foods/data/mutations";
import { useFoodDetailQuery } from "../../features/foods/data/queries";

export default function EditFood() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: food } = useFoodDetailQuery({ id: Number(id) });
  const [message, setMessage] = useState("");
  const canSeeFoods = useVariableValue("foods", false);

  const updateMutation = useUpdateFoodMutation();

  const handleSubmit = async (fields: any) => {
    if (!food) return;
    const input: FoodUpdateInput = { id: food?.id, fields };
    updateMutation.mutate(input, {
      onSuccess: () => {
        setMessage("Food updated successfully");
      },
    });
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
