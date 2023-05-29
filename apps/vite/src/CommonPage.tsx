import { useRef } from "react";
import Header from "./Toolbar";
import Drawer from "./Drawer";
import { Outlet } from "react-router-dom";

export default function CommonPage() {
  const drawerToggleRef = useRef<HTMLInputElement>(null);
  const openDrawer = () => drawerToggleRef.current?.click();

  return (
    <Drawer toggleRef={drawerToggleRef}>
      <Header onClickSidebarButton={openDrawer} />
      <div className="grow">
        <Outlet/>
      </div>
    </Drawer>
  );
}
