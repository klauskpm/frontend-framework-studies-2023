import { createBrowserRouter, RouterProvider } from "react-router-dom";

import CommonPage from "./CommonPage";

import Home from "./pages";
import Login, { loginLoader } from "./pages/login";
import Profile, { profileLoader } from "./pages/profile";
import Foods from "./pages/foods";
import CreateFoods from "./pages/foods/create";
import EditFood, { foodLoader } from "./pages/foods/[id]";
import FoodTable from "./pages/foods/table";
import FoodList from "./pages/foods/list";
import FoodGraph from "./pages/foods/graph";
import FeatureFlags from "./pages/feature-flags";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CommonPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "login", element: <Login />, loader: loginLoader },
      { path: "profile", element: <Profile />, loader: profileLoader },
      { path: "feature-flags", element: <FeatureFlags /> },
      {
        path: "foods",
        element: <Foods />,
        children: [
          { path: "table", element: <FoodTable /> },
          { path: "list", element: <FoodList /> },
          { path: "graph", element: <FoodGraph /> },
        ],
      },
      { path: "foods/create", element: <CreateFoods /> },
      { path: "foods/:id", element: <EditFood />, loader: foodLoader },
    ],
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
