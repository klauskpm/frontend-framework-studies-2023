import { useState } from "react";
import { useVariableValue } from "@devcycle/devcycle-react-sdk";
import { useNavigate } from "react-router-dom";

import { Card, ToastSuccess } from "@shared/react-ui";
import FoodForm from "../../features/foods/components/FoodForm";
import { createFood } from "../../features/foods/data/database";
import { useMutation } from "@tanstack/react-query";

export default function CreateFoods() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const canSeeFoods = useVariableValue("foods", false);

  const createMutation = useMutation({
    mutationFn: (fields: any) => createFood(fields),
    onSuccess: () => {
      setMessage("Food created successfully");
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
