import { identifiedUserId } from "../../identified-user.";

export default function FeatureFlags() {
  return (
    <iframe
      data-dvc-widget="dvc-iframe"
      src={`https://opt-in.devcycle.com/?userId=${identifiedUserId}&sdkKey=${
        import.meta.env.VITE_DVC_SDK_KEY
      }`}
      title="Feature Opt-In"
      width="100%"
      height="100%"
      style={{ border: "none" }}
    ></iframe>
  );
}
