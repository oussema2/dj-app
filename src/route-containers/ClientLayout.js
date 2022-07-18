import React from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import Header from "../Molecules/Header";
import Home from "../Pages/Home";
const ClientLayout = () => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div>
      {" "}
      <Header />
      {location.pathname === "/" ? <Home /> : null}
      <Outlet />
    </div>
  );
};

export default ClientLayout;
