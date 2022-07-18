import React from "react";
import { Link } from "react-router-dom";

const RegisterSuccess = () => {
  return (
    <div>
      <div className="page-title-success-register">
        <p className="title-content">
          You are successfully registred in bash , your welcome new talent
        </p>
      </div>
      <div className="login-form-container-success">
        <p className="description-success">
          CLick On THe Login Button Below To Open Your account and manage your
          party.
        </p>

        <Link className="success-url" to={"/login"}>
          To Login Page
        </Link>
      </div>
    </div>
  );
};

export default RegisterSuccess;
