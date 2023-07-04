import { useVariableValue } from "@devcycle/devcycle-react-sdk";

export default function Foods() {
  const canSeeFoods = useVariableValue("foods", false);
  const canCreateEditFood = useVariableValue("food-create-edit", false);
  const canSeeFoodList = useVariableValue("food-list", false);
  const canSeeFoodGraph = useVariableValue("food-graph", false);
  const canSeeFoodTable = useVariableValue("food-table", false);

  console.group("Foods component");
  console.log("canSeeFoods", canSeeFoods);
  console.log("canCreateEditFood", canCreateEditFood);
  console.log("canSeeFoodList", canSeeFoodList);
  console.log("canSeeFoodGraph", canSeeFoodGraph);
  console.log("canSeeFoodTable", canSeeFoodTable);
  console.groupEnd();

  const boolToText = (bool: boolean) => {
    return bool ? "true" : "false";
  };

  return (
    <div className="m-8 w-3/5">
      <div className="mb-4 flex items-end justify-between">
        <h2 className="text-3xl font-bold">Foods</h2>
      </div>
      <ul className="rounded bg-base-100 p-8 text-right shadow-lg shadow-secondary/30">
        <li>canSeeFoods: {boolToText(canSeeFoods)}</li>
        <li>canCreateEditFood: {boolToText(canCreateEditFood)}</li>
        <li>canSeeFoodList: {boolToText(canSeeFoodList)}</li>
        <li>canSeeFoodGraph: {boolToText(canSeeFoodGraph)}</li>
        <li>canSeeFoodTable: {boolToText(canSeeFoodTable)}</li>
      </ul>
    </div>
  );
}
