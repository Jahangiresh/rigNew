import React from "react";
import ServicesCard from "./ServicesCard";

const ServicesComponent = () => {
  return (
    <div className="bg__blue py-12">
      <div className="container">
        <div className="content flex flex-col items-center mb-14">
          <h1 className="font-bold text-[28px] text-white text-center mb3">
            Services
          </h1>
          <p className="leading-6 text-center md:w-[700px] text-white">
            Lorem ipsum dolor sit amet consectetur. Amet donec leo sit erat.
            Eleifend risus diam cursus dictum est Lorem ipsum dolor sit amet
            consectetur.
          </p>
        </div>
        <div className="services">
          <ServicesCard />
        </div>
      </div>
    </div>
  );
};

export default ServicesComponent;
