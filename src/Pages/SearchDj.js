import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DJCarteHome from "../Molecules/DJCarteHome";
import ReactLoading from "react-loading";

const SearchDj = () => {
  const params = useParams();
  const [djs, setDjs] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `http://localhost:5000/dj/search/${params.dj}/${params.state}`
      );
      if (response.data.status === 200) {
        setDjs(response.data.djs);
      }
    })();
  }, []);

  return (
    <div>
      <div className="reserve-dj-top">
        <h1 className="reserve-dj-top-title">You Search For :</h1>
        {params.dj !== "fill" && params.state !== "fill" ? (
          <p className="reserve-dj-top-description">
            {params.dj} in {params.state} : 10 DJ found
          </p>
        ) : null}
        {params.dj === "fill" && params.state !== "fill" ? (
          <p className="reserve-dj-top-description">
            DJ IN {params.state} : 10 DJ found
          </p>
        ) : null}
        {params.dj !== "fill" && params.state === "fill" ? (
          <p className="reserve-dj-top-description">
            {params.dj} : 10 DJ found
          </p>
        ) : null}
      </div>
      <div className="stepper-container">
        {djs ? (
          djs.map((el) => <DJCarteHome dj={el} />)
        ) : (
          <div className="loaderContainer">
            <ReactLoading
              type={"bubbles"}
              color={"green"}
              height={500}
              width={250}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDj;
