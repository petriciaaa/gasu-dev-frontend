import React, { useEffect } from "react";

import Header from "./layout/header/Header";
import Footer from "./layout/footer/Footer";
import RootRouter from "./../routes/RootRouter";
import { useLocation } from "react-router";
import "src/assets/scss/main.scss";

const App = () => {
  const baseUrl = "/";
  const currentPath = useLocation();

  return (
    <>
      {<Header />}
      <main>
        <div className="wrapper">
          <RootRouter />
        </div>
      </main>

      {currentPath.pathname === baseUrl ? null : <Footer />}
    </>
  );
};

export default App;
