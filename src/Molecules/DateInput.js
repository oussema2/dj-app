import React, { useEffect, useState } from "react";

const DateInput = (props) => {
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  console.log(date);

  return (
    <div style={{ position: "relative" }}>
      {" "}
      <div className="dropDownData-container">
        <p className="dropDown-title">{props.label}</p>
        <div className="dropdown-control">
          <div className="dropDown-container">
            <input
              onChange={(e) =>
                props.onChangeDateInput
                  ? props.onChangeDateInput(props.name, e.target.value)
                  : null
              }
              min={date}
              type={"date"}
              className="dateInput-value"
            />
            <span className="dateInput-logo"></span>
          </div>
        </div>
      </div>
      {props.errShown === props.name ? (
        <p className="errorMsj">{props.errorMsj}</p>
      ) : null}
    </div>
  );
};

export default DateInput;
