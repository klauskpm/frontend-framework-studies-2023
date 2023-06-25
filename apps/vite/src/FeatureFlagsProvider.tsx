import { ReactElement, ReactNode, useEffect } from "react";
import { useDVCClient, withDVCProvider } from "@devcycle/devcycle-react-sdk";
import { useSession } from "./SessionProvider";

interface FeatureFlagsProviderProps {
  children: ReactNode | ReactElement;
}

function FeatureFlagsProvider({ children }: FeatureFlagsProviderProps) {
  const dvcClient = useDVCClient();
  const [session] = useSession();
  const user = session?.user;

  useEffect(() => {
    if (!user?.id) return;
    dvcClient.identifyUser({ user_id: user.id }).then();
  }, [user, dvcClient]);

  return children;
}

export default withDVCProvider({
  sdkKey: import.meta.env.VITE_DVC_SDK_KEY,
  user: { isAnonymous: true },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
})(FeatureFlagsProvider);
