import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./dashboard.scss";
import { Routes, useRoutes } from "react-router";
import { Route } from "react-router";
import TeamEditForm from "./TeamEditForm";
import NewsEditForm from "./NewsEditForm";
import UsersEditForm from "./UsersEditForm";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const location = useLocation();
  const isAdmin = useSelector<any, any>((state) => state.adminReducer);

  return (
    <>
      {isAdmin && (
        <section className="dashboard h-auto w-auto flex   ">
          <nav className="sidebar flex flex-col items-start ">
            <div className="sidebar-wrapper  w-full">
              <NavLink className=" nav__element " to={`/dashboard/news_edit`}>
                <button>
                  <span> Новости</span>
                </button>
              </NavLink>
              <NavLink className="nav__element" to={`/dashboard/team_edit`}>
                <button>
                  <span>Состав</span>
                </button>
              </NavLink>
              <NavLink className="nav__element" to={`/dashboard/users_edit`}>
                <button>
                  <span>Пользователи</span>
                </button>
              </NavLink>
            </div>
          </nav>
          <div className="dashboard__edit">
            <Routes>
              <Route path="/news_edit" element={<NewsEditForm />}>
                {""}
              </Route>
              <Route path="/team_edit" element={<TeamEditForm />}>
                {""}
              </Route>
              <Route path="/users_edit" element={<UsersEditForm />}>
                {""}
              </Route>
            </Routes>
          </div>
        </section>
      )}
    </>
  );
};
export default Dashboard;
