import { Link } from "react-router-dom";
import { useVariableValue } from "@devcycle/react-client-sdk";

export default function Drawer({ children, toggleRef }: any) {
  const canSeeFoods = useVariableValue("foods", false);
  return (
    <div className="drawer">
      <input
        id="my-drawer-3"
        type="checkbox"
        className="drawer-toggle"
        ref={toggleRef}
      />
      <div className="drawer-content flex h-full min-h-screen flex-col">
        {children}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu h-full w-80 bg-base-100 p-4">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          {canSeeFoods && (
            <li>
              <Link to={"/foods"}>Foods</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
