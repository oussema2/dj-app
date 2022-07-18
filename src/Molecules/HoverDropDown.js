import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const HoverDropDown = (props) => {
  const wrapperRef = useRef(null);
  const [dropDownOpen, setDropDownOpen] = useState(false);

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
  console.log(dropDownOpen);
  return (
    <div ref={wrapperRef} className="hover-dropDown-wrapper">
      {" "}
      <p onClick={() => setDropDownOpen(!dropDownOpen)} className="litleTitle">
        {props.title}
      </p>
      {dropDownOpen ? (
        <div className="hover-dropDown-container">
          {props.menu.map((item) => (
            <div className="hover-dropDown-item">
              <Link
                style={{
                  width: "100%",
                  height: "100%",
                }}
                className="link-no-style "
                to={item.path}
              >
                <p className="hover-dropDown-item-text">{item.title}</p>
              </Link>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default HoverDropDown;
