import { Route, Routes } from "react-router-dom";
import "./App.css";
import DjIncription from "./Pages/DjIncription";
import DjOverview from "./Pages/DjOverview";
import DjPhotos from "./Pages/DjPhotos";
import DjProfile from "./Pages/DjProfile";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ReserveDj from "./Pages/ReserveDj";
import Step1 from "./Pages/reserveDjSteps/Step1";
import Step2 from "./Pages/reserveDjSteps/Step2";
import Step3 from "./Pages/reserveDjSteps/Step3";
import Step4 from "./Pages/reserveDjSteps/Step4";
import Step5 from "./Pages/reserveDjSteps/Step5";
import Step6 from "./Pages/reserveDjSteps/Step6";
import ClientLayout from "./route-containers/ClientLayout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="dj-inscription" element={<DjIncription />} />
          <Route path="djs" element={<Home />} />
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
  );
}

export default App;
