import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import * as Tabs from '@radix-ui/react-tabs';
import { useEffect } from "react";


export default function Foods() {
  const navigate = useNavigate();
  const location = useLocation();
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
      <Link to={"/foods/create"} className="link-primary link" role="button">
        Create new food
      </Link>

      <Tabs.Root
        className="flex flex-col w-3/5"
        defaultValue={defaultTab}
        onValueChange={handleChangeTab}
      >
        <Tabs.List className="tabs" aria-label="Manage your account">
          <Tabs.Trigger
            className="tab tab-bordered data-[state=active]:tab-active"
            value="table"
          >
            Table
          </Tabs.Trigger>
          <Tabs.Trigger
            className="tab tab-bordered data-[state=active]:tab-active"
            value="list"
          >
            List
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content
          className="grow p-5 rounded-b-md outline-none"
          value="table"
        >
          <Outlet />
        </Tabs.Content>
        <Tabs.Content
          className="grow p-5 rounded-b-md outline-none"
          value="list"
        >
          <Outlet />
        </Tabs.Content>
      </Tabs.Root>
      
    </div>
  );
}



