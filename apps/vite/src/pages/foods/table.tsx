import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useVariableValue } from "@devcycle/devcycle-react-sdk";

import { useOldSession } from "../../features/supabase/useOldSession";
import {
  Food,
  deleteFood,
  getPaginatedFoods,
} from "../../features/foods/data/database";
import { PaginationButtons } from "@shared/react-ui";

export default function FoodTable() {
  const [session] = useOldSession();
  const [count, setCount] = useState(0);
  const [foods, setFoods] = useState<Food[]>([]);
  const [page, setPage] = useState(0);
  const [itemsPerPage] = useState(5);

  const canCreateEditFood = useVariableValue("food-create-edit", false);
  const canDeleteFood = useVariableValue("food-delete", false);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleClickDelete = (id: number) => {
    if (!canDeleteFood) return;
    deleteFood(id).then(() => {
      setFoods(foods.filter((food) => food.id !== id));
    });
  };

  useEffect(() => {
    getPaginatedFoods({ page, itemsPerPage }).then(({ data, count }) => {
      if (!data || count === null) return;
      setFoods(data);
      setCount(count);
    });
  }, [page, itemsPerPage]);

  return (
    <>
      <div className="w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Available quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food: any) => (
              <tr key={food.id}>
                <td>
                  {canCreateEditFood && (
                    <Link
                      to={`/foods/${food.id}`}
                      className="link-primary link"
                    >
                      {food.title}
                    </Link>
                  )}
                  {!canCreateEditFood && food.title}
                </td>
                <td>{food.price}</td>
                <td>{food.quantity}</td>
                <td>
                  <button
                    className="btn-error btn-sm btn"
                    disabled={!session?.user || !canDeleteFood}
                    onClick={() => handleClickDelete(food.id)}
                  >
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
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-4 py-2">
          <TablePagination
            count={count}
            itemsPerPage={itemsPerPage}
            onClick={handleClickDelete}
            page={page}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}

function TablePagination(props: any) {
  const { count, itemsPerPage, page, handlePageChange } = props;

  return (
    <div className="flex items-center space-x-4">
      <div>Total: {count}</div>
      <PaginationButtons
        count={count}
        currentPage={page}
        itemsPerPage={itemsPerPage}
        onClick={handlePageChange}
      />
    </div>
  );
}
