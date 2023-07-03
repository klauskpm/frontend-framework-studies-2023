import { ReactElement, ReactNode } from "react";
import { useIsDVCInitialized } from "@devcycle/devcycle-react-sdk";

interface FeatureFlagsProviderProps {
  children: ReactNode | ReactElement;
}

export default function FeatureFlagsProvider({
  children,
}: FeatureFlagsProviderProps) {
  const dvcReady = useIsDVCInitialized();

  if (!dvcReady) return <div>Loading</div>;

  return <>{children}</>;
}
