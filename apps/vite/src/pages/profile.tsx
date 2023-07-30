import { FormEvent, useEffect, useRef, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";

import { supabase } from "../features/supabase/supabaseClient";
import { getProfile, updateProfile } from "../features/profiles/data/database";
import { downloadImage, uploadAvatar } from "../features/profiles/data/storage";
import { AvatarInput, Card } from "@shared/react-ui";
import { useSession } from "../features/supabase/useSession";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export default function Profile() {
  const { session } = useSession();
  const queryClient = useQueryClient();
  const usernameRef = useRef<any>();
  const websiteRef = useRef<any>();

  const [isUploading, setUploading] = useState<boolean>(false);
  const navigate = useNavigate();
  const user = session?.user;

  const [avatarUrl, setAvatarUrl] = useState<string>();

  const profileQueryKey = ["profile", user?.id];
  const invalidateProfileQuery = () =>
    queryClient.invalidateQueries(profileQueryKey);
  const profileQuery = useQuery({
    queryKey: profileQueryKey,
    queryFn: () => getProfile(user?.id),
    enabled: !!user,
  });
  const loading = profileQuery.isLoading;
  const profile = {
    username: profileQuery.data?.data?.username,
    website: profileQuery.data?.data?.website,
    avatar_url: profileQuery.data?.data?.avatar_url,
  };

  const updateProfileMutation = useMutation({
    mutationFn: ({ id, fields }: any) => updateProfile(id, fields),
    onSuccess: () => invalidateProfileQuery(),
  });

  useEffect(() => {
    if (!profile?.avatar_url) return;
    downloadImage(profile.avatar_url).then((imageURL: string) =>
      setAvatarUrl(imageURL)
    );
  }, [profile?.avatar_url]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!profile || !user?.id) return;

    updateProfileMutation.mutate({
      id: user.id,
      fields: {
        username: usernameRef.current.value,
        website: websiteRef.current.value,
      },
    });
  };

  const handleUploadAvatar = async (filePath: string) => {
    const { error } = await updateProfile(user.id, { avatar_url: filePath });

    if (error) {
      alert(error.message);
    }

    invalidateProfileQuery();
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

  if (!session) return <div>Loading...</div>;

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
                defaultValue={session.user.email}
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
                ref={usernameRef}
                defaultValue={profile?.username || ""}
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
                ref={websiteRef}
                defaultValue={profile?.website || ""}
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
