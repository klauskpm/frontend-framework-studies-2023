import { useRef } from "react";
import Header from "./Header";
import Drawer from "./Drawer";

export default function CommonPage({ children }: any) {
  const drawerToggleRef = useRef<HTMLInputElement>(null);
  const openDrawer = () => drawerToggleRef.current?.click();

  return (
    <Drawer toggleRef={drawerToggleRef}>
      <Header onClickSidebarButton={openDrawer} />
      <div className="grow">{children}</div>
    </Drawer>
  );
}
