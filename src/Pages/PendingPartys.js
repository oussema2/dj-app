import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PartyCard from "../Molecules/PartyCard";
import DjPartys from "./DjPartys";

const PendingPartys = () => {
  const params = useParams();
  console.log(params.type === "pendings");
  const [partys, setPartys] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `http://localhost:5000/dj/getUserNormal/${params.id}`
      );
      console.log(response);
      if (response.data.status === 200) {
        setPartys(response.data.dj.pendingPartys);
      }
    })();
  }, []);
  console.log(partys);
  return (
    <div>
      {" "}
      <div>
        {" "}
        <div className="inscri-dj-top">
          <h1 className="reserve-dj-top-title">Your Pending Partys</h1>
        </div>
        <div className="dj-form-container">
          <div className="stepper-container">
            {partys?.map((item) => (
              <PartyCard />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingPartys;
