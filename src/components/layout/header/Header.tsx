import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MenuIcon } from "@heroicons/react/outline";
import { ReactComponent as Home } from "src/assets/icons/home.svg";
import { ReactComponent as Dashboard } from "src/assets/icons/dashboard.svg";
import { ReactComponent as Portal } from "src/assets/icons/portal.svg";
import { ReactComponent as Groups } from "src/assets/icons/groups.svg";
import { ReactComponent as Login } from "src/assets/icons/login.svg";
import { ReactComponent as Account } from "src/assets/icons/account.svg";
import { ReactComponent as GasuSite } from "src/assets/icons/gasu.svg";
import { ReactComponent as Contacts } from "src/assets/icons/contacts.svg";
import { useDispatch, useSelector } from "react-redux";
import "./header.scss";

const Header: React.FC = () => {
  // Почему мы обращаемся к редьюсеру, а не к стейту?
  // Работает!
  const username = useSelector<any, any>(
    (state) => state.registrationReducer.username
  );

  const isAdmin = useSelector<any, any>((state) => state.adminReducer);
  const isAuth = useSelector<any, any>((state) => state.authReducer);
  console.log(isAuth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);
  const [color, setColor] = useState("white");
  const [headerActive, setHeaderActive] = useState(false);
  const handleToggleMenu = (prev) => {
    setMenuOpen(!prev);
    setHeaderActive(!headerActive);
  };

  return (
    <header className={`header-breakpoint ${headerActive ? "active" : ""} `}>
      <div className="header w-5/6  rounded-3xl  items-center justify-between hidden xs:flex">
        <div className="header__logo ml-6">
          <NavLink to={"/"} className=" link ml-7 flex ">
            {" "}
            {/* {<Home />} */}
            <h1 className="uppercase logo__text">@студсовет</h1>
          </NavLink>
        </div>

        <nav className="header__nav rounded-3xl flex items-center justify-between p-4">
          <NavLink to={"/"} className="header__nav__element link ml-7 flex ">
            {" "}
            {/* {<Home />} */}
            Главная
          </NavLink>
          <NavLink to={"/team"} className="header__nav__element link  flex ">
            {" "}
            {/* {<About />} */}
            Состав
          </NavLink>
          <NavLink to={"/news"} className="header__nav__element link flex ">
            {" "}
            {/* {<Portal className="mr-1 mt-1" />} */}
            Новости
          </NavLink>
          <NavLink to={"/contacts"} className="header__nav__element link flex ">
            {" "}
            {/* {<Portal className="mr-1 mt-1" />} */}
            Контакты
          </NavLink>
          <NavLink
            to={"https://www.spbgasu.ru/"}
            className="header__nav__element link flex"
          >
            {" "}
            {/* {<GasuSite />} */}
            СПБГАСУ
          </NavLink>
          {isAdmin === "admin" && (
            <NavLink
              to={"/dashboard"}
              className="header__nav__element flex link mr-7  "
            >
              {" "}
              Админ панель
            </NavLink>
          )}
        </nav>

        <div className="header__login mr-7 flex items center ">
          <NavLink
            to={username.toLowerCase() === "login" ? "/login" : "/profile"}
          >
            <button className="header__login__btn rounded-3xl flex items-center justify-center">
              {username.toLowerCase() != "login" ? <Account /> : <Login />}

              <span className="login__btn-text ml-2">
                {username ? username : "Login"}
              </span>
            </button>
          </NavLink>
          {isAuth == "true" && (
            <button
              className="header__login__btn header__login__btn-logout rounded-3xl flex items-center justify-center ml-2"
              onClick={() => {
                localStorage.removeItem("currentUser");
                localStorage.setItem("isAuth", "false");
                localStorage.setItem(
                  "isCurrentUserAdmin",
                  JSON.stringify("false")
                );
                navigate("/");
                window.location.reload();
              }}
            >
              <span className="login__btn-text ml-2">{"Log out"}</span>
            </button>
          )}
        </div>
      </div>
      <button
        onClick={() => {
          handleToggleMenu(menuOpen);
        }}
        className="xs:hidden  p-2 text-gray-700 hover:text-gray-900"
      >
        <MenuIcon className="w-12 h-12 xs:w-12 xs:h-12" />
      </button>
      {menuOpen && (
        <div
          className={`header__wrapper flex items-center flex-col justify-center  w-full  `}
        >
          {" "}
          <nav className=" rounded-3xl flex flex-col items-baseline justify-start p-1 mt-2">
            <NavLink
              to={"/"}
              className="header__nav__element link ml-7 flex items-center justify-center"
            >
              {" "}
              {<Home />}
              Главная
            </NavLink>
            <NavLink
              to={"/about"}
              className="header__nav__element link  flex  items-center justify-center"
            >
              {" "}
              {<Groups />}
              Состав
            </NavLink>
            <NavLink
              to={"/news"}
              className="header__nav__element link flex  items-center justify-center"
            >
              {" "}
              {<Portal className="mr-1 mt-1" />}
              Новости
            </NavLink>
            <NavLink
              to={"/contacts"}
              className="header__nav__element link flex items-center justify-center"
            >
              <Contacts />
              {/* {<Portal className="mr-1 mt-1" />} */}
              Контакты
            </NavLink>
            <NavLink
              to={"/news"}
              className="header__nav__element link flex items-center justify-center"
            >
              {" "}
              {<GasuSite />}
              СПБГАСУ
            </NavLink>
            {isAdmin === "admin" && (
              <NavLink
                to={"/dashboard"}
                className="header__nav__element flex link mr-7  items-center justify-center "
              >
                <Dashboard />
                Админ панель
              </NavLink>
            )}
          </nav>
          <div className="mt-4">
            <NavLink
              to={username.toLowerCase() === "login" ? "/login" : "/profile"}
            >
              <button className="header__login__btn rounded-3xl flex items-center justify-center ml-1">
                {username.toLowerCase() != "login" ? <Account /> : <Login />}

                <span className="login__btn-text ml-2">
                  {username ? username : "Login"}
                </span>
              </button>
            </NavLink>
            {isAuth == "true" && (
              <button
                className="header__login__btn rounded-3xl flex items-center justify-center ml-2"
                onClick={() => {
                  localStorage.removeItem("currentUser");
                  localStorage.setItem("isAuth", "false");
                  localStorage.setItem(
                    "isCurrentUserAdmin",
                    JSON.stringify("false")
                  );

                  navigate("/");
                  window.location.reload();
                }}
              >
                <span className="login__btn-text ml-2">{"Log out"}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
