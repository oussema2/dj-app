import React from "react";
import { Link } from "react-router-dom";

const DJCarteHome = ({ dj }) => {
  return (
    <Link to={`/djs/${dj.businessName}/overview`} className="link-no-style">
      <div className="DJ-carte-Container">
        <div className="dj-carte-wrapper">
          <div className="dj-carte-leftSide">
            <div className="dj-carte-image-container">
              <img
                className="dj-image"
                alt="test"
                src={`http://localhost:5000/djImages/${dj?._id}/${dj?.profilePicture}`}
              />
            </div>
          </div>
          <div className="dj-carte-rightSide">
            <div className="dj-carte-rightSide-top">
              <h3 className="dj-title">{dj.businessName}</h3>
              <p className="dj-service-location">
                {dj.djType} FROM {dj.state}
              </p>
              <p className="dj-description">
                {dj.bio?.slice(0, 150)}
                <span className="learnMore-dj-carte">LEARN MORE</span>
              </p>
            </div>
            <div className="dj-carte-rightSide-bottom">
              <div className="dj-carte-rightSide-bottom-left">
                <p className="startingAt">STARTING AT</p>
                <p className="tarif-dj">
                  <span className="icon-dollar-dj-carte"></span>£{dj.tarif} per
                  event
                </p>
              </div>
              <div className="d-carte-rightSide-bottom-right">
                <Link
                  className="link-no-style"
                  to={`/djs/${dj.businessName}/overview`}
                >
                  {" "}
                  <button className="dj-carte-viewProfile-btn">
                    VIEW PROFILE
                  </button>
                </Link>
                <Link
                  className="link-no-style"
                  to={`/reserve_dj/${dj.businessName}/step/1`}
                >
                  <button className="dj-carte-book-btn">
                    REQUEST FREE QUOTE
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DJCarteHome;
