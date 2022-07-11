import React from "react";
import { Link } from "react-router-dom";

const DJCarteHome = () => {
  return (
    <Link to={"/djs/5"} className="link-no-style">
      <div className="DJ-carte-Container">
        <div className="dj-carte-wrapper">
          <div className="dj-carte-leftSide">
            <div className="dj-carte-image-container">
              <img
                className="dj-image"
                alt="test"
                src="//media-api.xogrp.com/images/ad5dd77b-15f3-4e10-9174-963563ad05e1~cr_741.874.2240.2377-sc_250.250?quality=50"
              />
            </div>
          </div>
          <div className="dj-carte-rightSide">
            <div className="dj-carte-rightSide-top">
              <h3 className="dj-title">Music and Memories Dj Service</h3>
              <p className="dj-service-location">
                Mobile DJ FROM URBANDALE , IA (4 miles from MOINES , IA )
              </p>
              <p className="dj-description">
                My name is Ron Moss, and I've been a DJ/Emcee for weddings and
                special occasions since 1998. If experience is important to you
                when choosing your DJ, call me today, and I'll answer any
                questions! With all pro equipment,
                <span className="learnMore-dj-carte">LEARN MORE</span>
              </p>
            </div>
            <div className="dj-carte-rightSide-bottom">
              <div className="dj-carte-rightSide-bottom-left">
                <p className="startingAt">STARTING AT</p>
                <p className="tarif-dj">
                  <span className="icon-dollar-dj-carte"></span>£500 per event
                </p>
              </div>
              <div className="d-carte-rightSide-bottom-right">
                <Link className="link-no-style" to={"/djs/5"}>
                  {" "}
                  <button className="dj-carte-viewProfile-btn">
                    VIEW PROFILE
                  </button>
                </Link>
                <Link className="link-no-style" to={"/reserve_dj/5"}>
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
