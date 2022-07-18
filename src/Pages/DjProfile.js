import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import ReactLoading from "react-loading";

const DjProfile = () => {
  const [currentSide, setCurrentSide] = useState("overview");
  const params = useParams();
  const location = useLocation();
  console.log(location.pathname.includes("photos"));
  const [dj, setDj] = useState({});
  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `http://localhost:5000/dj/getDjByBussinessName/${params.id}`
      );
      console.log(response);
      if (response.data.status === 200) {
        setDj(response.data.dj);
      }
    })();
  }, []);

  return (
    <div className="dj-profile-container">
      {location.pathname.includes("photos") ? null : (
        <div>
          {" "}
          {dj.pictures ? (
            <div className="dj-profile-picture">
              <div className="dj-profile-picture-leftSide">
                <div className="dj-profile-picture-mainPic-wrapper">
                  <img
                    className="dj-profile-picture-mainpic"
                    alt="test1"
                    src={`http://localhost:5000/djImages/${dj?._id}/${dj?.profilePicture}`}
                  />
                </div>
              </div>
              <div className="dj-profile-picture-rightSide">
                <div className="dj-profile-picture-rightSide-leftSide">
                  {dj?.pictures[1] ? (
                    <img
                      className="dj-profile-secondary-pic"
                      alt="test2"
                      src={`http://localhost:5000/djImages/${dj?._id}/${dj?.pictures[1]}`}
                    />
                  ) : null}{" "}
                  {dj?.pictures[2] ? (
                    <img
                      className="dj-profile-secondary-pic"
                      alt="test3"
                      src={`http://localhost:5000/djImages/${dj?._id}/${dj?.pictures[2]}`}
                    />
                  ) : null}{" "}
                </div>
                <div className="dj-profile-picture-rightSide-rightSide">
                  {dj?.pictures[3] ? (
                    <img
                      className="dj-profile-secondary-pic"
                      alt="test4"
                      src={`http://localhost:5000/djImages/${dj?._id}/${dj?.pictures[3]}`}
                    />
                  ) : null}
                  {dj?.pictures[4] ? (
                    <img
                      className="dj-profile-secondary-pic"
                      alt="test5"
                      src={`http://localhost:5000/djImages/${dj?._id}/${dj?.pictures[4]}`}
                    />
                  ) : null}
                </div>
              </div>
            </div>
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
      )}
      <div
        className={`profileSides-header ${
          currentSide === "overview"
            ? "profileSides-header-overviewSelected"
            : null
        } ${
          currentSide === "photo" ? "profileSides-header-photoSelected" : null
        }  ${
          currentSide === "audio"
            ? "profileSides-header-viedoAudioSelected "
            : null
        }  `}
      >
        <Link to={"overview"}>
          <button
            className="profileSides-button"
            onClick={() => setCurrentSide("overview")}
          >
            Overview
          </button>
        </Link>
        <Link to={"photos"}>
          <button
            className="profileSides-button"
            onClick={() => setCurrentSide("photo")}
          >
            Photos{" "}
            <span className="number-ofUnits"> ({dj.pictures?.length})</span>
          </button>
        </Link>

        {/* <div className="selected-side" /> */}
      </div>
      <Outlet context={[dj]} />
    </div>
  );
};

export default DjProfile;
