import { ReactElement, ReactNode, useEffect, useState } from "react";
import {
  useDVCClient,
  useIsDVCInitialized,
} from "@devcycle/devcycle-react-sdk";
import { useSession } from "./features/supabase/useSession";

interface FeatureFlagsProviderProps {
  children: ReactNode | ReactElement;
}

export default function ContentBlocker({
  children,
}: FeatureFlagsProviderProps) {
  const [showContent, setShowContent] = useState(false);
  const dvcClient = useDVCClient();
  const dvcReady = useIsDVCInitialized();
  const { session, fetched } = useSession();
  const user = session?.user;

  useEffect(() => {
    if (!user?.id) return;
    dvcClient.identifyUser({ user_id: user.id }).then();
  }, [user, dvcClient]);

  useEffect(() => {
    if (!fetched || !dvcReady) return;
    setTimeout(() => {
      setShowContent(true);
    }, 600);
  }, [fetched, dvcReady]);

  if (showContent) return <>{children}</>;

  return (
    <div className="flex h-screen w-screen flex-col content-center items-center justify-center">
      <h2 className="mb-4 text-2xl">Loading</h2>
      <progress className="progress progress-primary h-8 w-56"></progress>
    </div>
  );
}
