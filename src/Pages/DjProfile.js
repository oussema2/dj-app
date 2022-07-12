import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const DjProfile = () => {
  const [currentSide, setCurrentSide] = useState("overview");
  return (
    <div className="dj-profile-container">
      <div className="dj-profile-picture">
        <div className="dj-profile-picture-leftSide">
          <div className="dj-profile-picture-mainPic-wrapper">
            <img
              className="dj-profile-picture-mainpic"
              alt="test1"
              src={
                "//media-api.xogrp.com/images/d5047862-fdad-4b86-9d1f-05f0b67c69fc~rs_360.h.fit"
              }
            />
          </div>
        </div>
        <div className="dj-profile-picture-rightSide">
          <div className="dj-profile-picture-rightSide-leftSide">
            <img
              className="dj-profile-secondary-pic"
              alt="test2"
              src={
                "//media-api.xogrp.com/images/d5047862-fdad-4b86-9d1f-05f0b67c69fc~rs_360.h.fit"
              }
            />{" "}
            <img
              className="dj-profile-secondary-pic"
              alt="test3"
              src={
                "//media-api.xogrp.com/images/d5047862-fdad-4b86-9d1f-05f0b67c69fc~rs_360.h.fit"
              }
            />{" "}
          </div>
          <div className="dj-profile-picture-rightSide-rightSide">
            <img
              className="dj-profile-secondary-pic"
              alt="test4"
              src={
                "//media-api.xogrp.com/images/d5047862-fdad-4b86-9d1f-05f0b67c69fc~rs_360.h.fit"
              }
            />{" "}
            <img
              className="dj-profile-secondary-pic"
              alt="test5"
              src={
                "//media-api.xogrp.com/images/d5047862-fdad-4b86-9d1f-05f0b67c69fc~rs_360.h.fit"
              }
            />
          </div>
        </div>
      </div>
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
            Photos <span className="number-ofUnits"> (10)</span>
          </button>
        </Link>

        <button
          className="profileSides-button"
          onClick={() => setCurrentSide("audio")}
        >
          Videos & Audio <span className="number-ofUnits"> (6)</span>
        </button>
        {/* <div className="selected-side" /> */}
      </div>
      <Outlet />
    </div>
  );
};

export default DjProfile;
