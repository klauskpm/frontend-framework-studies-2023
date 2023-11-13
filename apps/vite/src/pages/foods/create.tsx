import { useVariableValue } from "@devcycle/react-client-sdk";
import { useNavigate } from "react-router-dom";

import { Card } from "@shared/react-ui";
import FoodForm from "../../features/foods/components/FoodForm";
import { useCreateFoodMutation } from "../../features/foods/data/mutations";

export default function CreateFoods() {
  const navigate = useNavigate();

  const canSeeFoods = useVariableValue("foods", false);
  const createFood = useCreateFoodMutation();

  const handleSubmit = async (fields: any) => {
    createFood.mutate(fields, {
      onSuccess: (response) => {
        if (!response) return;
        navigate(`/foods/${response.id}`);
      },
    });
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
            loading={createFood.isPending}
          />
        </div>
      </Card>
    </div>
  );
}
