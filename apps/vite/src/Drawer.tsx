import { Link } from "react-router-dom";

export default function Drawer({ children, toggleRef }: any) {
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
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/countries"}>Countries</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
