import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AllDj from "./Pages/AllDj";
import DjIncription from "./Pages/DjIncription";
import DjOverview from "./Pages/DjOverview";
import DjPartys from "./Pages/DjPartys";
import DjPhotos from "./Pages/DjPhotos";
import DjProfile from "./Pages/DjProfile";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import RegisterSuccess from "./Pages/RegisterSuccess";
import ReserveDj from "./Pages/ReserveDj";
import Step1 from "./Pages/reserveDjSteps/Step1";
import Step2 from "./Pages/reserveDjSteps/Step2";
import Step3 from "./Pages/reserveDjSteps/Step3";
import Step4 from "./Pages/reserveDjSteps/Step4";
import Step5 from "./Pages/reserveDjSteps/Step5";
import Step6 from "./Pages/reserveDjSteps/Step6";
import SearchDj from "./Pages/SearchDj";
import ClientLayout from "./route-containers/ClientLayout";
import { ConnectContext } from "./StateManagement/ConnectContext/ConnectContext";
import {
  connectReducer,
  initialConnectState,
} from "./StateManagement/ConnectContext/ConnectReducer";

function App() {
  const [connectState, dispatchConnect] = useReducer(
    connectReducer,
    initialConnectState
  );
  useEffect(() => {
    (async () => {
      console.log(connectState);
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        `Bearer ${localStorage.getItem("token")}`
      );
      myHeaders.append("Content-Type", "application/json");

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch("http://localhost:5000/dj/getUser", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          const response = JSON.parse(result);
          console.log(response);
          dispatchConnect({
            type: "LITTLE_LOGIN",
            payload: {
              token: localStorage.getItem("token"),
              djData: response.dj,
            },
          });
        })
        .catch((error) => console.log("error", error));
    })();
  }, []);

  return (
    <ConnectContext.Provider value={{ connectState, dispatchConnect }}>
      <div className="App">
        <Routes>
          <Route path="/" element={<ClientLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register/success" element={<RegisterSuccess />} />
            <Route path="dj-inscription" element={<DjIncription />} />
            <Route path="djs" element={<Home />} />
            <Route path="djs/:id/:type" element={<DjPartys />} />
            <Route path="djs/search/:dj/:state" element={<SearchDj />} />

            <Route path="djs/all" element={<AllDj />} />
            <Route path="djs/:id" element={<DjProfile />}>
              <Route path="overview" element={<DjOverview />} />
              <Route path="photos" element={<DjPhotos />} />
            </Route>
            <Route path="reserve_dj/:id" element={<ReserveDj />}>
              <Route path="step/1" element={<Step1 />} />
              <Route path="step/2" element={<Step2 />} />
              <Route path="step/3" element={<Step3 />} />
              <Route path="step/4" element={<Step4 />} />
              <Route path="step/5" element={<Step5 />} />
              <Route path="step/6" element={<Step6 />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </ConnectContext.Provider>
  );
}

export default App;
