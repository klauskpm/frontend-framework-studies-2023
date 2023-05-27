import { supabase } from "../../supabaseClient";
import { useParams } from "react-router-dom";
import FoodForm from "../../features/foods/components/FoodForm";
import Card from "../../components/Card";

const updateFood = async (id: number, fields: any) => {
  const { data, error } = await supabase
    .from("foods")
    .update(fields)
    .eq("id", id);

  if (error) {
    console.warn(error);
  } else if (data) {
    console.log(data);
  }
};

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
