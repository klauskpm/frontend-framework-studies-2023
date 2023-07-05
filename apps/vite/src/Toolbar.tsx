import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { supabase } from "./features/supabase/supabaseClient";
import { downloadImage } from "./features/profiles/data/storage";
import { logoutUser } from "./auth";
import { Avatar } from "@shared/react-ui";
import { useSession } from "./features/supabase/useSession";

export default function Header({ onClickSidebarButton }: any) {
  const [avatar_url, setAvatarUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const { session } = useSession();

  useEffect(() => {
    async function getProfile() {
      if (!session) return;
      setLoading(true);
      const { user } = session;

      const { data, error } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error) {
        console.warn(error);
      } else if (data) {
        downloadImage(data.avatar_url).then((imageURL: string) =>
          setAvatarUrl(imageURL)
        );
      }

      setLoading(false);
    }

    getProfile();
  }, [session]);

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
        {!session && (
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        )}
        {session && (
          <div className="dropdown-end dropdown">
            <button className="btn-circle btn">
              <Avatar size="small" loading={loading} avatarUrl={avatar_url} />
            </button>
            <ul className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow">
              {session && (
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                  </Link>
                </li>
              )}
              <li>
                <Link to="/feature-flags" className="justify-between">
                  Feature Flags
                  <span className="badge">New</span>
                </Link>
              </li>

              <li>
                <a href="#" onClick={() => logoutUser()}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
