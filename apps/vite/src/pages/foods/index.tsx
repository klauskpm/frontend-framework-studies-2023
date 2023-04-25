import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Database } from "../../../supabase";
import { Link } from "react-router-dom";

export type Food = Database["public"]["Tables"]["foods"]["Row"];

export async function getFoods() {
  return supabase.from("foods").select();
}

export default function Foods() {
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    getFoods().then(({ data }) => {
      if (!data) return;
      setFoods(data);
    });
  }, []);

  return (
    <div className="prose">
      <h1>Foods</h1>
      <Link to={"/foods/create"} className="link link-primary" role="button">
        Create new food
      </Link>
      <ul>
        {foods.map((food: any) => (
          <li key={food.id}>{food.title}</li>
        ))}
      </ul>
    </div>
  );
}
