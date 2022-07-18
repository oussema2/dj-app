import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footerContainer">
      <div className="proj-title-footer">
        <Link className="link-no-style" to={"/djs"}>
          {" "}
          <p className="title-foorer">The BASH</p>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
