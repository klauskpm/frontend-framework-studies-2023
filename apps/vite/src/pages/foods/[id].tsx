import { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useVariableValue } from "@devcycle/devcycle-react-sdk";

import { Card, ToastSuccess } from "@shared/react-ui";
import FoodForm from "../../features/foods/components/FoodForm";
import { Food, getFood, updateFood } from "../../features/foods/data/database";
import { useMutation } from "@tanstack/react-query";

export default function EditFood() {
  const navigate = useNavigate();
  const food = useLoaderData() as Food | null;
  const { id } = useParams<{ id: string }>();
  const [message, setMessage] = useState("");
  const canSeeFoods = useVariableValue("foods", false);

  const updateMutation = useMutation({
    mutationFn: ({ id, fields }: { id: number; fields: any }) =>
      updateFood(id, fields),
    onSuccess: () => {
      setMessage("Food updated successfully");
    },
  });

  const handleSubmit = async (fields: any) => {
    updateMutation.mutate({ id: Number(id), fields });
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
            loading={updateMutation.isLoading}
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

export const foodLoader = async ({ params }: any): Promise<Food | null> => {
  const { id } = params;
  const { data } = await getFood(Number(id));

  return data;
};
