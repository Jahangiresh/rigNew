import React from "react";
import RingLoader from "react-spinners/RingLoader";
const LoadingBox = () => {
  return (
    <div className="loadingbox">
      <RingLoader color="#e87813" />
    </div>
  );
};

export default LoadingBox;
