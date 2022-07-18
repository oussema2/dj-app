import React from "react";

const TextAreaWithDescription = (props) => {
  return (
    <div>
      {" "}
      <div>
        {" "}
        <div
          style={{ position: "relative" }}
          className="dropDownData-container"
        >
          <p className="dropDown-title">{props.label}</p>
          <p className="input-description">{props.description}</p>
          <div className="dropdown-control-input-description">
            <div className="dropDown-container">
              <textarea
                id={props.id}
                cols={50}
                rows={20}
                placeholder={props.placeHolder}
                type={props.type}
                className="inputEl-textarea"
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
    </div>
  );
};

export default TextAreaWithDescription;
