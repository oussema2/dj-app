import React from "react";

const InputWithDescription = (props) => {
  return (
    <div>
      {" "}
      <div
        id={props.id}
        style={{ position: "relative" }}
        className="dropDownData-container"
      >
        <p className="dropDown-title">{props.label}</p>
        <p className="input-description">{props.description}</p>
        <div className="dropdown-control-input-description">
          <div className="dropDown-container">
            <input
              placeholder={props.placeHolder}
              type={props.type}
              className="inputEl"
              onChange={(e) =>
                props.onChageInput
                  ? props.onChageInput(props.name, e.target.value)
                  : null
              }
            />
          </div>
          {props.errShown === props.name ? (
            <p className="errorMsj">{props.errorMsj}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default InputWithDescription;
