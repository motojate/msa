import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ProtectRoute from "./ProtectRoute";
import Post from "../pages/Post";

const RouterConfig = () => {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/sign-up",
      element: <SignUp />,
    },
    {
      path: "/",
      element: <ProtectRoute />,
      children: [
        {
          path: "post",
          element: <Post />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default RouterConfig;
