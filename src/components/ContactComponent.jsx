import React from "react";
import mapsvg from "../assets/images/mapVector.svg";
import { FiChevronRight } from "react-icons/fi";

const ContactComponent = () => {
  return (
    <div className="bg__blue h-[282px] relative">
      <img
        className="absolute -z-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        src={mapsvg}
        alt=""
      />
      <div className="content flex flex-col justify-center h-full items-center">
        <h2 className="text-white font-bold text-3xl ">Contact Us</h2>
        <p className="my-4 text-white leading-8  md:w-[720px] text-center">
          Lorem ipsum dolor sit amet consectetur. Amet donec leo sit erat.
          Eleifend risus diam cursus dictum est Lorem ipsum dolor sit amet
          consectetur. Amet donec leo sit erat. Eleifend
        </p>
        <button className="btn__main flex items-center ">Contact us</button>
      </div>
    </div>
  );
};

export default ContactComponent;
