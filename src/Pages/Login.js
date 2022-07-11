import React from "react";

const Login = () => {
  return (
    <div>
      <div className="page-title">
        <p className="title-content">Login</p>
      </div>
      <div className="login-form-container">
        <p>Welcome back to the party! Login below.</p>
        <form className="login-form">
          <input className="login-input" type={"text"} placeholder="Username" />
          <input
            className="login-input"
            type={"password"}
            placeholder="Password"
          />
          <input className="login-button" type={"button"} value="ENTER" />
        </form>
      </div>
    </div>
  );
};

export default Login;
