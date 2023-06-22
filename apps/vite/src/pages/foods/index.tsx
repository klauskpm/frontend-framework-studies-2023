import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import * as Tabs from "@radix-ui/react-tabs";
import { useEffect } from "react";
import { useSession } from "../../SessionProvider";
import Card from "../../components/Card";

export default function Foods() {
  const navigate = useNavigate();
  const location = useLocation();
  const [session] = useSession();
  const defaultTab = "table";

  useEffect(() => {
    if (location.pathname === "/foods") {
      navigate(`/foods/${defaultTab}`);
    }
  }, [location, navigate]);

  const handleChangeTab = (value: string) => {
    navigate(`/foods/${value}`);
  };

  return (
    <div className="m-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-3xl font-bold">Foods</h2>
        {session?.user && (
          <Link to={"/foods/create"} className="link-primary link">
            Add a new food
          </Link>
        )}
      </div>
      <Tabs.Root
        className="flex w-3/5 flex-col"
        defaultValue={defaultTab}
        onValueChange={handleChangeTab}
      >
        <Tabs.List className="tabs mb-4" aria-label="Manage your account">
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
          <Tabs.Trigger
            className="tab-bordered tab data-[state=active]:tab-active"
            value="graph"
          >
            Graph
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content className="grow rounded-b-md outline-none" value="table">
          <Card>
            <Outlet />
          </Card>
        </Tabs.Content>
        <Tabs.Content className="grow rounded-b-md outline-none" value="list">
          <Card>
            <Outlet />
          </Card>
        </Tabs.Content>
        <Tabs.Content className="grow rounded-b-md outline-none" value="graph">
          <Card>
            <Outlet />
          </Card>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
