import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages";
import Login from "./pages/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  { path: 'login', element: <Login /> },
]);


export default function Routes() {
    return <RouterProvider router={router} />;
}