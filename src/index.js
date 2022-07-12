import React from "react";
import "./fonts/Sofia_Pro_SemiBold.ttf";
import "./fonts/Sofia_Pro_Regular.ttf";
import "./fonts/Sofia_Pro_Light.ttf";
import "./fonts/Sofia_Pro_Bold.ttf";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
