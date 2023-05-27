import { supabase } from "../../supabaseClient";
import Card from "../../components/Card";
import FoodForm from "../../features/foods/components/FoodForm";

const createFood = async (fields: any) => {
    const { data, error } = await supabase.from("foods").insert([fields]);
    if (error) {
        console.warn(error);
    } else if (data) {
        console.log(data);
    }
};

export default function CreateFoods() {
  return (
    <div className="m-8">
      <h2 className="text-3xl font-bold mb-4">New food</h2>
      <Card>
        <div className="card-body">
          <FoodForm onSubmit={createFood} buttonText="Create food" />
        </div>
      </Card>
    </div>
  );
}
