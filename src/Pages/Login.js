import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConnectContext } from "../StateManagement/ConnectContext/ConnectContext";

const Login = () => {
  const [loginData, setloginData] = useState({});
  const [snack, setSnack] = useState({ open: false, message: "" });
  const connectContext = useContext(ConnectContext);
  const navigate = useNavigate();

  if (connectContext.connectState.connected) {
    navigate("/djs");
  }
  const handleClose = () => {
    setSnack({ ...snack, open: false });
  };
  const connect = async (e) => {
    e.preventDefault();
    console.log(loginData);
    const connectResponse = await axios.get(
      `http://localhost:5000/dj/login/${loginData.email}/${loginData.password}`
    );
    if (connectResponse.data.status === 401) {
      setSnack({ open: true, message: connectResponse.data.message });
    }

    if (connectResponse.data.status === 200) {
      console.log(connectResponse.data.token);
      connectContext.dispatchConnect({
        type: "LOGIN",
        payload: {
          token: connectResponse.data.token,
          djData: connectResponse.data.dj,
        },
      });
    }

    console.log(connectResponse);
  };

  return (
    <div
      style={{ backgroundColor: "#f8f8f8" }}
      className="dj-partys-page-container"
    >
      <div className="page-title">
        <p className="title-content">Login</p>
      </div>
      <div className="login-form-container">
        <p>Welcome back to the party! Login below.</p>
        <form onSubmit={(e) => connect(e)} className="login-form">
          <input
            onChange={(e) =>
              setloginData({ ...loginData, email: e.target.value })
            }
            className="login-input"
            type={"text"}
            placeholder="Email"
          />
          <input
            onChange={(e) =>
              setloginData({ ...loginData, password: e.target.value })
            }
            className="login-input"
            type={"password"}
            placeholder="Password"
          />
          <input className="login-button" type={"submit"} value="ENTER" />
        </form>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snack.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
