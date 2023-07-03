import { useVariableValue } from "@devcycle/devcycle-react-sdk";

export default function Foods() {
  const canSeeFood = useVariableValue("foods", false);
  const canCreateEditFood = useVariableValue("food-create-edit", false);
  const canSeeFoodList = useVariableValue("food-list", false);
  const canSeeFoodGraph = useVariableValue("food-graph", false);
  const canSeeFoodTable = useVariableValue("food-table", false);

  const boolToText = (bool: boolean) => {
    return bool ? "true" : "false";
  };

  return (
    <div className="m-8 w-3/5">
      <div className="mb-4 flex items-end justify-between">
        <h2 className="text-3xl font-bold">Foods</h2>
      </div>
      <ul>
        <li>canSeeFood: {boolToText(canSeeFood)}</li>
        <li>canCreateEditFood: {boolToText(canCreateEditFood)}</li>
        <li>canSeeFoodList: {boolToText(canSeeFoodList)}</li>
        <li>canSeeFoodGraph: {boolToText(canSeeFoodGraph)}</li>
        <li>canSeeFoodTable: {boolToText(canSeeFoodTable)}</li>
      </ul>
    </div>
  );
}
