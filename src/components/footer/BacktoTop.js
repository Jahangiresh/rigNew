import React from "react";
import BackToTop from "react-back-to-top-button";
import StraightIcon from "@mui/icons-material/Straight";

const BacktoTop = () => {
  return (
    <BackToTop showOnScrollUp showAt={100} speed={1500} easing="easeInOutQuint">
      <StraightIcon
        style={{
          color: "#fff",
          backgroundColor: "#e87813",
          borderRadius: "7px",
          width: "50px",
          height: "50px",
        }}
      />
    </BackToTop>
  );
};

export default BacktoTop;
