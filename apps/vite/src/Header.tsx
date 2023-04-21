import { useEffect, useState } from "react";

import { supabase } from "./supabaseClient";
import { downloadImage } from "./helpers/downloadImage";
import { logoutUser } from "./auth";
import { useSession } from "./SessionProvider";

export default function Header() {
  const [avatar_url, setAvatarUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [session] = useSession();

  useEffect(() => {
    async function getProfile() {
      if (!session) return;
      setLoading(true);
      const { user } = session;

      let { data, error } = await supabase
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
        <button className="btn-ghost btn-square btn">
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
      </div>
      <div className="flex-1">
        <a className="btn-ghost btn text-xl normal-case" href="/">daisyUI</a>
      </div>
      <div className="flex-none gap-2">
        {!session && (
          <ul className="menu menu-horizontal px-1">
            <li>
              <a href="/login">Login</a>
            </li>
          </ul>
        )}
        {session && (
          <div className="dropdown-end dropdown">
            <button className="btn-ghost btn-circle avatar btn">
              <div className="w-10 rounded-full">
                {(loading || !avatar_url) ? (
                  <div className="h-10 w-10 animate-pulse rounded-full bg-base-content"></div>
                ) : (
                  <img src={avatar_url} />
                )}
              </div>
            </button>
            <ul className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow">
              {session && (
                <li>
                  <a href="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
              )}
              
              <li>
                <a href="#" onClick={() => logoutUser()}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
