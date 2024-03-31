import React from "react";
import rootRouter from "./index";
import { Route, Routes } from "react-router";

export default function RootRouter() {
  const routes = rootRouter.map((el, index) => {
    return <Route element={el.element} path={el.path}></Route>;
  });

  return <Routes>{routes}</Routes>;
}
