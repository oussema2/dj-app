import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Molecules/Header";
const ClientLayout = () => {
  return (
    <div>
      {" "}
      <Header />
      <Outlet />
    </div>
  );
};

export default ClientLayout;
