import { useEffect } from "react";
import { useSession } from "../SessionProvider";

export default function FeatureFlags() {
  const [session] = useSession();
  const user = session?.user;

  useEffect(() => {
    const iframe = document.querySelector(
      "iframe[data-dvc-widget='dvc-iframe']"
    ) as HTMLIFrameElement;
    window.addEventListener(
      "message",
      function (e) {
        const t = e.data;
        "DVC.optIn.updateHeight" === t.type && (iframe.style.height = t.height);
      },
      !1
    );
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
