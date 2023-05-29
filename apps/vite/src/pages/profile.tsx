import { useState, useEffect, FormEvent } from "react";
import { redirect, useNavigate } from "react-router-dom";

import Avatar from "../components/Avatar";
import { useSession } from "../SessionProvider";
import Card from "../components/Card";
import { supabase } from "../features/supabase/supabaseClient";
import { getProfile, updateProfile } from "../features/profiles/data/database";

export const profileLoader = async () => {
  const session = await supabase.auth.getSession().then(({ data }) => {
    return data?.session;
  });

  if (!!session?.user) {
    return null;
  }

  return redirect("/login");
};

export default function Profile() {
  const [session] = useSession();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const navigate = useNavigate();
  const user = session?.user;

  useEffect(() => {
    if (!user) return;

    setLoading(true);

    getProfile(user.id).then(({ data, error }) => {
      if (error) {
        console.warn(error);
      } else if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
      setLoading(false);
    });
  }, [user]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setLoading(true);

    const fields = {
      username,
      website,
      avatar_url
    };

    const { error } = await updateProfile(user.id, fields);

    if (error) {
      alert(error.message);
    }
    setLoading(false);
  }

  const handleUploadAvatar = async (event: InputEvent, avatar_url: string) => {
    event.preventDefault();
    
    const { error } = await updateProfile(user.id, { avatar_url });

    if (error) {
      alert(error.message);
    }

    setAvatarUrl(avatar_url);
  };

  if (!session && loading) return <div>Loading...</div>;

  if (!session?.user) {
    navigate("/login");
    return null;
  };

  return (
    <div className="m-8 max-w-md">
      <Card>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control items-center">
                <Avatar
                  url={avatar_url}
                  size={150}
                  onUpload={handleUploadAvatar}
                />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="email">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  id="email"
                  value={session.user.email}
                  disabled
                  className="input-bordered input"
                />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="username">
                  <span className="label-text">Username</span>
                </label>
                <input
                  id="username"
                  type="text"
                  className="input-bordered input"
                  required
                  value={username || ""}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="webstie">
                  <span className="label-text">Website</span>
                </label>
                <input
                  id="website"
                  type="url"
                  className="input-bordered input"
                  value={website || ""}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              <div className="mt-6">
                <button
                  className="btn-primary btn"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Loading ..." : "Update"}
                </button>
              </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
