import { FormEvent, useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";

import { useSession } from "../features/supabase/useSession";
import { supabase } from "../features/supabase/supabaseClient";
import {
  getProfile,
  Profile as ProfileType,
  updateProfile,
} from "../features/profiles/data/database";
import { downloadImage, uploadAvatar } from "../features/profiles/data/storage";
import { AvatarInput, Card } from "@shared/react-ui";

export const profileLoader = async () => {
  const session = await supabase.auth.getSession().then(({ data }) => {
    return data?.session;
  });
  const hasUser = !!session?.user;

  if (hasUser) {
    return null;
  }

  return redirect("/login");
};

type ChangeableProfile = Pick<
  ProfileType,
  "username" | "website" | "avatar_url"
>;

export default function Profile() {
  const [session] = useSession();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ChangeableProfile>();
  const [isUploading, setUploading] = useState<boolean>(false);
  const navigate = useNavigate();
  const user = session?.user;

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!profile?.avatar_url) return;
    downloadImage(profile.avatar_url).then((imageURL: string) =>
      setAvatarUrl(imageURL)
    );
  }, [profile?.avatar_url]);

  useEffect(() => {
    if (!user) return;

    setLoading(true);

    getProfile(user.id).then(({ data, error }) => {
      if (error) {
        console.warn(error);
      } else if (data) {
        setProfile({
          username: data.username,
          website: data.website,
          avatar_url: data.avatar_url,
        });
      }
      setLoading(false);
    });
  }, [user]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!profile) return;

    setLoading(true);

    const fields = {
      username: profile.username,
      website: profile.website,
    };

    const { error } = await updateProfile(user.id, fields);

    if (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  const handleUploadAvatar = async (filePath: string) => {
    const { error } = await updateProfile(user.id, { avatar_url: filePath });

    if (error) {
      alert(error.message);
    }

    handleFieldChange({ avatar_url: filePath });
  };

  const handleImageChange = async (file: File) => {
    try {
      setUploading(true);

      const { error: uploadError, filePath } = await uploadAvatar(file);

      if (uploadError) {
        throw uploadError;
      }

      handleUploadAvatar(filePath);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleFieldChange = (fields: any) => {
    setProfile((currentProfile) => {
      return { ...currentProfile, ...fields };
    });
  };

  if (!session && loading) return <div>Loading...</div>;

  if (!session?.user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="m-8 max-w-md">
      <Card>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control items-center">
              <AvatarInput
                avatarUrl={avatarUrl}
                onChange={handleImageChange}
                isUploading={isUploading}
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
                value={profile?.username || ""}
                onChange={(e) =>
                  handleFieldChange({ username: e.target.value })
                }
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
                value={profile?.website || ""}
                onChange={(e) => handleFieldChange({ website: e.target.value })}
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
