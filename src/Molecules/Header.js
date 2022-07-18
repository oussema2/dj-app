import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ConnectContext } from "../StateManagement/ConnectContext/ConnectContext";
import HoverDropDown from "./HoverDropDown";

const Header = () => {
  const { connectState, dispatchConnect } = useContext(ConnectContext);
  const navigate = useNavigate();
  const logout = () => {
    dispatchConnect({ type: "LOGOUT" });
    navigate("/login");
  };
  console.log(connectState);
  const menu = [
    {
      path: `/djs/${connectState.dj?.djData?.businessName}/pendings`,
      title: "Pending Party",
    },
    {
      path: `/djs/${connectState.dj?.djData?.businessName}/upcoming`,
      title: "Upcoming Party",
    },
    {
      path: `/djs/${connectState.dj?.djData?.businessName}/previous`,
      title: "Previous Party",
    },
  ];
  return (
    <div className="headerContainer">
      <div className="headerElementWrapper">
        <div className="leftSideHeaderContainer">
          {" "}
          <Link className="link-no-style" to={"/djs"}>
            {" "}
            <p className="the-bash">THE BASH</p>
          </Link>
        </div>
        <div className="rightSideHeaderContainer">
          {connectState.connected ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <HoverDropDown
                menu={menu}
                title={connectState.dj?.djData?.firstName}
              />

              <img
                className="profile-pic-header"
                alt={`${connectState.dj?.firstName}`}
                src={`http://localhost:5000/djImages/${connectState.dj?.djData?._id}/${connectState.dj?.djData?.profilePicture}`}
              />

              <p onClick={logout} className="litleTitle">
                LOG OUT
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Link className="link-no-style" to={"/login"}>
                <p className="litleTitle">LOG IN</p>
              </Link>
              <Link to={"/dj-inscription"}>
                <button className="button-primary">LIST YOUR SERVICE</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
