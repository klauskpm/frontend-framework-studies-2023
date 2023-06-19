import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import * as Tabs from "@radix-ui/react-tabs";
import { useEffect } from "react";
import { useSession } from "../../SessionProvider";

export default function Foods() {
  const navigate = useNavigate();
  const location = useLocation();
  const [session] = useSession();
  const defaultTab = "table";

  useEffect(() => {
    if (location.pathname === "/foods") {
      navigate(`/foods/${defaultTab}`);
    }
  }, [location]);

  const handleChangeTab = (value: string) => {
    navigate(`/foods/${value}`);
  };

  return (
    <div>
      <h1>Foods</h1>
      {session?.user && (
        <Link to={"/foods/create"} className="link-primary link">
          Create new food
        </Link>
      )}

      <Tabs.Root
        className="flex w-3/5 flex-col"
        defaultValue={defaultTab}
        onValueChange={handleChangeTab}
      >
        <Tabs.List className="tabs" aria-label="Manage your account">
          <Tabs.Trigger
            className="tab-bordered tab data-[state=active]:tab-active"
            value="table"
          >
            Table
          </Tabs.Trigger>
          <Tabs.Trigger
            className="tab-bordered tab data-[state=active]:tab-active"
            value="list"
          >
            List
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content
          className="grow rounded-b-md p-5 outline-none"
          value="table"
        >
          <Outlet />
        </Tabs.Content>
        <Tabs.Content
          className="grow rounded-b-md p-5 outline-none"
          value="list"
        >
          <Outlet />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
