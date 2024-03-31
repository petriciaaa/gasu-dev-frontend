import React, { ReactNode } from "react";
import Home from "./../pages/Home";
import Auth from "../pages/Auth";
import Profile from "./../pages/Profile";
import SignIn from "../pages/Auth";
import Team from "../pages/Team";
import News from "../pages/News";
import Dashboard from "./../pages/Dashboard";
import Contacts from "./../pages/Contacts";

interface IrootRouter {
  name: string;
  path: string;
  element: ReactNode;
  payload?: any;
}

const rootRouter: IrootRouter[] = [
  {
    name: "",
    path: "/",
    element: <Home />,
  },
  {
    name: "login",
    path: "/login",
    element: <Auth />,
  },
  {
    name: "profile",
    path: "/profile",
    element: <Profile />,
  },
  {
    name: "profile",
    path: "/sign_in",
    element: <SignIn />,
  },
  {
    name: "team",
    path: "/team",
    element: <Team />,
  },
  {
    name: "news",
    path: "/news",
    element: <News />,
  },
  {
    name: "dashboard",
    path: "/dashboard/*",
    element: <Dashboard />,
  },
  {
    name: "contacts",
    path: "/contacts/*",
    element: <Contacts />,
  },
  ,
];
export default rootRouter;
