import { createBrowserRouter, RouterProvider } from "react-router-dom";

import CommonPage from "./CommonPage";

import Home from "./pages";
import Login, { loginLoader } from "./pages/login";
import Profile from "./pages/profile";
import Foods from "./pages/foods";
import CreateFoods from "./pages/foods/create";
import EditFood from "./pages/foods/[id]";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CommonPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "login", element: <Login />, loader: loginLoader },
      { path: "profile", element: <Profile /> },
      { path: "foods", children: [
        { path: "/foods", element: <Foods /> },
        { path: "/foods/create", element: <CreateFoods /> },
        { path: "/foods/:id", element: <EditFood /> },
      ] },
    ],
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
