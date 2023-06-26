import { useEffect } from "react";
import { useDVCClient } from "@devcycle/devcycle-react-sdk";

import { useSession } from "../SessionProvider";

export default function FeatureFlags() {
  const dvcClient = useDVCClient();
  const [session] = useSession();
  const user = session?.user;

  useEffect(() => {
    if (!user) return;
    function iframeMessage() {
      dvcClient.identifyUser({ user_id: user.id }).then();
    }
    window.addEventListener("message", iframeMessage, !1);

    return () => window.removeEventListener("message", iframeMessage);
  }, [user, dvcClient]);

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
