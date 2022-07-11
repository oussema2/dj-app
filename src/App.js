import { Route, Routes } from "react-router-dom";
import "./App.css";
import DjProfile from "./Pages/DjProfile";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ReserveDj from "./Pages/ReserveDj";
import ClientLayout from "./route-containers/ClientLayout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="djs" element={<Home />} />
          <Route path="djs/:id" element={<DjProfile />} />
          <Route path="reserve_dj/:id" element={<ReserveDj />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
