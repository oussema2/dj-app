import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
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
          <Link className="link-no-style" to={"/login"}>
            <p className="litleTitle">LOG IN</p>
          </Link>
          <button className="button-primary">LIST YOUR SERVICE</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
