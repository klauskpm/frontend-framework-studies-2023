import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);


export default function Routes() {
    return <RouterProvider router={router} />;
}