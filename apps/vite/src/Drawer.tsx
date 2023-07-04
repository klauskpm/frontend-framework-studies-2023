import { Link } from "react-router-dom";
import { useDVCClient, useVariableValue } from "@devcycle/devcycle-react-sdk";
import { identifiedUserId } from "../identified-user.";

export default function Drawer({ children, toggleRef }: any) {
  const dvcClient = useDVCClient();
  const canSeeFoods = useVariableValue("foods", false);

  console.group("Drawer component");
  console.log("canSeeFoods", canSeeFoods);
  console.groupEnd();

  const identifyUser = () => {
    dvcClient.identifyUser({ user_id: identifiedUserId }).then();
  };

  return (
    <div className="drawer">
      <input
        id="my-drawer-3"
        type="checkbox"
        className="drawer-toggle"
        ref={toggleRef}
      />
      <div className="drawer-content flex h-screen min-h-screen flex-col">
        {children}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu w-80 bg-base-100 p-4">
          <li>
            <button onClick={identifyUser} className="btn-primary btn">
              Identify User
            </button>
          </li>
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
