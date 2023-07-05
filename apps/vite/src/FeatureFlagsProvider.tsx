import { ReactElement, ReactNode, useEffect } from "react";
import {
  useDVCClient,
  useIsDVCInitialized,
} from "@devcycle/devcycle-react-sdk";
import { useSession } from "./features/supabase/SessionProvider";

interface FeatureFlagsProviderProps {
  children: ReactNode | ReactElement;
}

export default function FeatureFlagsProvider({
  children,
}: FeatureFlagsProviderProps) {
  const dvcClient = useDVCClient();
  const [session] = useSession();
  const user = session?.user;

  useEffect(() => {
    if (!user?.id) return;
    dvcClient.identifyUser({ user_id: user.id }).then();
  }, [user, dvcClient]);

  const dvcReady = useIsDVCInitialized();

  if (!dvcReady) return <div>Loading</div>;

  return <>{children}</>;
}
