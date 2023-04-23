import { createBrowserRouter, RouterProvider } from "react-router-dom";

import CommonPage from "./CommonPage";

import Home from "./pages";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Countries from "./pages/countries";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CommonPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "profile", element: <Profile /> },
      { path: "countries", element: <Countries /> },
    ],
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
