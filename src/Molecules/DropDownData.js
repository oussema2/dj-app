import React, { useEffect, useRef, useState } from "react";

const DropDownData = (props) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [defaultPlaceHolder, setdefaultPlaceHolder] = useState(
    props.placeHolder
  );
  const wrapperRef = useRef(null);
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setDropDownOpen(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  useOutsideAlerter(wrapperRef);

  return (
    <div
      id={props.id}
      style={{ position: "relative" }}
      className="dropDownData-container"
    >
      <p className="dropDown-title">{props.label}</p>
      <div ref={wrapperRef} className="dropdown-control">
        <div
          onClick={() => setDropDownOpen(!dropDownOpen)}
          className="dropDown-container"
        >
          <div className="dropDown-value">{defaultPlaceHolder}</div>
          <span className="dropDown-arrow"></span>
        </div>
        {dropDownOpen ? (
          <div
            style={{
              position: "relative",
              width: "100%",
              zIndex: 9999,
              backgroundColor: "white",
            }}
          >
            <div className="dropDown-data-container">
              {props.data
                ? props.data.map((item) => (
                    <p
                      onClick={() => {
                        if (props.onChangeDropDown) {
                          props.onChangeDropDown(props.name, item.title);
                        }

                        setDropDownOpen(false);
                        setdefaultPlaceHolder(item.title);
                      }}
                      className="dropDown-data-item"
                    >
                      {item.title}
                    </p>
                  ))
                : null}
            </div>
          </div>
        ) : null}
      </div>
      {props.errShown === props.name ? (
        <p className="errorMsj">{props.errorMsj}</p>
      ) : null}
    </div>
  );
};

export default DropDownData;
