import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages";
import Login from "./pages/login";
import Profile from "./pages/profile";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: 'login', element: <Login /> },
  { path: 'profile', element: <Profile /> },
]);


export default function Routes() {
    return <RouterProvider router={router} />;
}