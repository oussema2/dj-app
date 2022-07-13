import React, { useEffect, useMemo, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const ReserveDj = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const currentStep = Number(location.pathname.split("/")[4]);

  const navigatePrev = () => {
    navigate(`step/${currentStep - 1}`);
  };
  const navigateNext = () => {
    navigate(`step/${currentStep + 1}`);
  };
  return (
    <div>
      <div className="reserve-dj-top">
        {currentStep === 1 ? (
          <h1 className="reserve-dj-top-title">let's get started</h1>
        ) : (
          <h1 className="reserve-dj-top-title">your event details</h1>
        )}
        {currentStep === 1 ? (
          <p className="reserve-dj-top-description">
            Tell us about your event and we'll contact the vendors you select
            for custom quotes.
          </p>
        ) : null}
      </div>
      <div className="stepper-container">
        <Outlet />
      </div>
    </div>
  );
};

export default ReserveDj;
