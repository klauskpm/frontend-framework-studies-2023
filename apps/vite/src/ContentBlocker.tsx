import { ReactElement, ReactNode, useEffect } from "react";
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
  const dvcClient = useDVCClient();
  const { session, fetched } = useSession();
  const user = session?.user;

  useEffect(() => {
    if (!user?.id) return;
    dvcClient.identifyUser({ user_id: user.id }).then();
  }, [user, dvcClient]);

  const dvcReady = useIsDVCInitialized();

  if (!dvcReady || !fetched) return <div>Loading</div>;

  return <>{children}</>;
}
