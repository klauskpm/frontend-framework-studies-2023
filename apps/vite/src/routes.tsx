import { createBrowserRouter, RouterProvider } from "react-router-dom";

import CommonPage from "./CommonPage";

import Home from "./pages";
import Foods from "./pages/foods";
import FeatureFlags from "./pages/feature-flags";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CommonPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "feature-flags", element: <FeatureFlags /> },
      {
        path: "foods",
        element: <Foods />,
      },
    ],
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
