import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import Avatar from "../Avatar";
import { useSession } from "../SessionProvider";
import CommonPage from "../CommonPage";

export default function Profile() {
  const [session] = useSession();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    async function getProfile() {
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
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }

      setLoading(false);
    }

    if (!session) return;
    getProfile();
  }, [session]);

  async function updateProfile(event: any) {
    event.preventDefault();

    setLoading(true);
    const { user } = session;

    const updates = {
      id: user.id,
      username,
      website,
      avatar_url,
      updated_at: new Date(),
    };

    let { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      alert(error.message);
    }
    setLoading(false);
  }

  if (!session && loading) return <CommonPage>Loading...</CommonPage>;

  return (
    <CommonPage>
      <div className="flex flex-row justify-center py-8">
        <form onSubmit={updateProfile} className="card w-full max-w-sm bg-base-100 shadow-2xl max-h-fit">
          <div className="card-body">
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

              <Avatar
                url={avatar_url}
                size={150}
                onUpload={(event, url) => {
                  setAvatarUrl(url);
                  updateProfile(event);
                }}
              />

              <div className="form-control mt-6">
                <button
                  className="btn-primary btn"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Loading ..." : "Update"}
                </button>
              </div>
          </div>
        </form>
      </div>
    </CommonPage>
  );
}
