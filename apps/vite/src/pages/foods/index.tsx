import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Database } from "../../../supabase";
import { Link } from "react-router-dom";

export type Food = Database["public"]["Tables"]["foods"]["Row"];

async function getFoods() {
  return supabase.from("foods").select();
}

async function deleteFood(id: number) {
  const { data, error } = await supabase.from("foods").delete().eq("id", id);

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
  };

  useEffect(() => {
    getFoods().then(({ data }) => {
      if (!data) return;
      setFoods(data);
    });
  }, []);

  return (
    <div>
      <h1>Foods</h1>
      <Link to={"/foods/create"} className="link-primary link" role="button">
        Create new food
      </Link>
      <div className="w-full overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food: any) => (
              <tr>
                <td>
                  <Link to={`/foods/${food.id}`} className="link-primary link">
                    {food.title}
                  </Link>
                </td>
                <td>
                  <div className="dropdown">
                    <button className="btn-accent btn-sm btn">
                      Actions...
                    </button>
                    <ul className="dropdown-content menu rounded-box w-52 bg-base-300 p-2 shadow">
                      <li>
                        <button
                          className="btn-link btn"
                          onClick={() => handleClickDelete(food.id)}
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Title</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
