import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import * as Tabs from "@radix-ui/react-tabs";
import { useEffect } from "react";
import { useVariableValue } from "@devcycle/devcycle-react-sdk";

import { Card } from "@shared/react-ui";
import { useSession } from "../../features/supabase/useSession";

export default function Foods() {
  const navigate = useNavigate();
  const location = useLocation();
  const { session } = useSession();

  const canCreateEditFood = useVariableValue("food-create-edit", false);
  const canSeeFoodList = useVariableValue("food-list", false);
  const canSeeFoodGraph = useVariableValue("food-graph", false);
  const canSeeFoodTable = useVariableValue("food-table", false);

  const defaultTab = "table";

  useEffect(() => {
    if (location.pathname === "/foods") {
      navigate(`/foods/${defaultTab}`);
    }
  }, [location, navigate]);

  useEffect(() => {}, [true, navigate]);

  const handleChangeTab = (value: string) => {
    navigate(`/foods/${value}`);
  };

  return (
    <div className="m-8 w-3/5">
      <div className="mb-4 flex items-end justify-between">
        <h2 className="text-3xl font-bold">Foods</h2>
        {session?.user && canCreateEditFood && (
          <Link to={"/foods/create"} className="link-primary link">
            Add a new food
          </Link>
        )}
      </div>
      <Tabs.Root
        className="flex flex-col"
        defaultValue={defaultTab}
        onValueChange={handleChangeTab}
      >
        <Tabs.List className="tabs mb-4" aria-label="Manage your account">
          {canSeeFoodTable && (
            <Tabs.Trigger
              className="tab-bordered tab data-[state=active]:tab-active"
              value="table"
            >
              Table
            </Tabs.Trigger>
          )}
          {canSeeFoodList && (
            <Tabs.Trigger
              className="tab-bordered tab data-[state=active]:tab-active"
              value="list"
            >
              List
            </Tabs.Trigger>
          )}
          {canSeeFoodGraph && (
            <Tabs.Trigger
              className="tab-bordered tab data-[state=active]:tab-active"
              value="graph"
            >
              Graph
            </Tabs.Trigger>
          )}
        </Tabs.List>
        {canSeeFoodTable && (
          <Tabs.Content
            className="grow rounded-b-md outline-none"
            value="table"
          >
            <Outlet />
          </Tabs.Content>
        )}
        {canSeeFoodList && (
          <Tabs.Content className="grow rounded-b-md outline-none" value="list">
            <Card>
              <Outlet />
            </Card>
          </Tabs.Content>
        )}
        {canSeeFoodGraph && (
          <Tabs.Content
            className="grow rounded-b-md outline-none"
            value="graph"
          >
            <Card>
              <Outlet />
            </Card>
          </Tabs.Content>
        )}
      </Tabs.Root>
    </div>
  );
}