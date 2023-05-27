import { useParams } from "react-router-dom";
import FoodForm from "../../features/foods/components/FoodForm";
import Card from "../../components/Card";
import { updateFood } from "../../features/foods/data/update-food";

export default function EditFood() {
  const { id } = useParams<{ id: string }>();
  const handleSubmit = (fields: any) => {
    updateFood(Number(id), fields);
  };

  return (
    <div className="m-8">
      <h2 className="text-3xl font-bold mb-4">Edit food</h2>
      <Card>
        <div className="card-body">
          <FoodForm
            onSubmit={handleSubmit}
            buttonText="Update food"
            id={id}
          />
        </div>
      </Card>
    </div>
  );
}
