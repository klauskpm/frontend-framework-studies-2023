import { useSession } from "../SessionProvider";

export default function FeatureFlags() {
  const [session] = useSession();
  const user = session?.user;

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
