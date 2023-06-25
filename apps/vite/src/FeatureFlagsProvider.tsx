import { ReactElement, ReactNode } from "react";
import { withDVCProvider } from "@devcycle/devcycle-react-sdk";

interface FeatureFlagsProviderProps {
  children: ReactNode | ReactElement;
}

function FeatureFlagsProvider({ children }: FeatureFlagsProviderProps) {
  return children;
}

export default withDVCProvider({
  sdkKey: import.meta.env.VITE_DVC_SDK_KEY,
  user: { isAnonymous: true },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
})(FeatureFlagsProvider);
