import React from "react";
import { useOutletContext } from "react-router-dom";

const DjPhotos = () => {
  const [dj] = useOutletContext();

  return (
    <div className="dj-pictures-side-container">
      {dj.pictures?.map((im) => (
        <div className="dj-photo-el-container">
          {" "}
          <img
            className="dj-images-item"
            alt={im}
            src={`http://localhost:5000/djImages/${dj?._id}/${im}`}
          />
        </div>
      ))}
    </div>
  );
};

export default DjPhotos;
