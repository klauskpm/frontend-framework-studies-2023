import { useEffect } from "react";
import { useSession } from "../features/supabase/useSession";

function reloadOnFeatureFlagUpdate(event: any) {
  const wasSaved = event?.data?.type === "DVC.optIn.saved";
  if (!wasSaved) return;
  location.reload();
}

export default function FeatureFlags() {
  const { session } = useSession();
  const user = session?.user;

  useEffect(() => {
    window.addEventListener("message", reloadOnFeatureFlagUpdate, !1);

    return () =>
      window.removeEventListener("message", reloadOnFeatureFlagUpdate);
  }, []);

  return (
    <iframe
      data-dvc-widget="dvc-iframe"
      src={`https://opt-in.devcycle.com/?userId=${user?.id}&sdkKey=${
        import.meta.env.VITE_DVC_SDK_KEY
      }`}
      title="Feature Opt-In"
      width="100%"
      height="100%"
      style={{ border: "none" }}
    ></iframe>
  );
}
