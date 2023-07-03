import { Link } from "react-router-dom";

export default function Header({ onClickSidebarButton }: any) {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-none">
        <label htmlFor="my-drawer-3">
          <button
            className="btn-ghost btn-square btn"
            onClick={onClickSidebarButton}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </label>
      </div>
      <div className="flex-1">
        <Link className="btn-ghost btn text-xl normal-case" to="/">
          Klaus' weird home page
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown-end dropdown">
          <button className="btn">Links</button>
          <ul className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow">
            <li>
              <Link to="/foods" className="justify-between">
                Foods
              </Link>
            </li>
            <li>
              <Link to="/feature-flags" className="justify-between">
                Feature Flags
                <span className="badge">New</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
