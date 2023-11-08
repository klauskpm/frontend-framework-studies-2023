import { useState } from "react";
import { useVariableValue } from "@devcycle/react-client-sdk";
import { useNavigate } from "react-router-dom";

import { Card, ToastSuccess } from "@shared/react-ui";
import FoodForm from "../../features/foods/components/FoodForm";
import { createFood } from "../../features/foods/data/database";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { foodsKeys } from "../../features/foods/data/queries";

export default function CreateFoods() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");

  const canSeeFoods = useVariableValue("foods", false);

  const createMutation = useMutation({
    mutationFn: (fields: any) => createFood(fields),
    onSuccess: () => {
      setMessage("Food created successfully");
      queryClient.invalidateQueries({ queryKey: foodsKeys.list() });
    },
  });

  const handleSubmit = async (fields: any) => {
    createMutation.mutate(fields);
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
            loading={createMutation.isLoading}
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
