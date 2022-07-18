import axios from "axios";
import React, { useEffect, useState } from "react";
import DJCarteHome from "../Molecules/DJCarteHome";
import ReactLoading from "react-loading";

const AllDj = () => {
  const [djs, setDjs] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const responseDjs = await axios.get("http://localhost:5000/dj/getAllDjs");

      console.log(responseDjs);
      if (responseDjs.data.status === 200) {
        setDjs(responseDjs.data.djs);
        setLoading(false);
      }
    })();
  }, []);
  return (
    <div>
      <div className="page-title-allDj">
        <p className="title-content">
          List Of All DJs...<br></br> Pick A Dj That Compatible with your needs
        </p>
      </div>

      <div className="djsSide-container">
        <h1>All Dj List</h1>
        <div className="djSide-djList">
          {djs ? djs.map((el) => <DJCarteHome dj={el} />) : null}
          {loading ? (
            <div className="loaderContainer">
              <ReactLoading
                type={"bubbles"}
                color={"green"}
                height={500}
                width={250}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AllDj;
