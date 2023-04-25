import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Database } from "../../../supabase";
import { Link } from "react-router-dom";

export type Food = Database["public"]["Tables"]["foods"]["Row"];

export async function getFoods() {
  return supabase.from("foods").select();
}

export async function deleteFood(id: number) {
  const { data, error } = await supabase
    .from('foods')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  } else {
    return data;
  }
}

export default function Foods() {
  const [foods, setFoods] = useState<Food[]>([]);

  const handleClickDelete = (id: number) => {
    deleteFood(id).then(() => {
      setFoods(foods.filter((food) => food.id !== id));
    });
  }

  useEffect(() => {
    getFoods().then(({ data }) => {
      if (!data) return;
      setFoods(data);
    });
  }, []);

  return (
    <div className="prose">
      <h1>Foods</h1>
      <Link to={"/foods/create"} className="link-primary link" role="button">
        Create new food
      </Link>
      <ul className="list-none">
        {foods.map((food: any) => (
          <li key={food.id} className="space-x-3 justify-items-center">
            <span>{food.title}</span>
            <button className="btn-error btn btn-sm" onClick={() => handleClickDelete(food.id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
              Delete food
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
