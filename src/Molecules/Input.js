import React from "react";

const Input = (props) => {
  console.log(props.errShown, props.name);
  return (
    <div style={{ position: "relative" }} className="dropDownData-container">
      <p className="dropDown-title">{props.label}</p>
      <div className="dropdown-control">
        <div className="dropDown-container">
          <input
            id={props.id}
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
  );
};

export default Input;
