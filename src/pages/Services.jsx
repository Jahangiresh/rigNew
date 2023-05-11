import React from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import ServicesCard from "../components/Services/ServicesCard";
import servicesvg from "../assets/images/servicesvector.svg";
import { FiChevronRight } from "react-icons/fi";
import ContactComponent from "../components/ContactComponent";
import LogoClouds from "../components/LogoClouds";

const Services = () => {
  return (
    <>
      <Breadcrumbs title={"Services"} />
      <div className="container">
        <div className="grid md:grid-cols-3 max-lg:gap-x-6 gap-x-20 max-md:gap-y-10 my-12 ">
          <div className=" py-7 px-3 max-md:px-10 flex flex-col items-center shadow-md rounded-lg border border-[#e3e3e3]">
            <div className="serviceimage w-[61px] h-[61px] mb-7">
              <img
                className="w-full h-full object-cover"
                src={servicesvg}
                alt=""
              />
            </div>
            <h2 className="text__black font-bold text-xl ">Inspection</h2>
            <p className="my-4 text__black text-center">
              Lorem ipsum dolor sit amet consectetur. Amet donec leo sit erat.
              Eleifend risus diam cursus dictum est Lorem ipsum dolor sit amet
              consectetur. Amet donec leo sit erat...
            </p>
            <button className="btn__secondary flex items-center mt-6">
              Read more <FiChevronRight className="ml-2" />
            </button>
          </div>{" "}
          <div className=" py-7 px-3 max-md:px-10 flex flex-col items-center shadow-md rounded-lg border border-[#e3e3e3]">
            <div className="serviceimage w-[61px] h-[61px] mb-7">
              <img
                className="w-full h-full object-cover"
                src={servicesvg}
                alt=""
              />
            </div>
            <h2 className="text__black font-bold text-xl ">Inspection</h2>
            <p className="my-4 text__black text-center">
              Lorem ipsum dolor sit amet consectetur. Amet donec leo sit erat.
              Eleifend risus diam cursus dictum est Lorem ipsum dolor sit amet
              consectetur. Amet donec leo sit erat...
            </p>
            <button className="btn__secondary flex items-center mt-6">
              Read more <FiChevronRight className="ml-2" />
            </button>
          </div>{" "}
          <div className=" py-7 px-3 max-md:px-10 flex flex-col items-center shadow-md rounded-lg border border-[#e3e3e3]">
            <div className="serviceimage w-[61px] h-[61px] mb-7">
              <img
                className="w-full h-full object-cover"
                src={servicesvg}
                alt=""
              />
            </div>
            <h2 className="text__black font-bold text-xl ">Inspection</h2>
            <p className="my-4 text__black text-center">
              Lorem ipsum dolor sit amet consectetur. Amet donec leo sit erat.
              Eleifend risus diam cursus dictum est Lorem ipsum dolor sit amet
              consectetur. Amet donec leo sit erat...
            </p>
            <button className="btn__secondary flex items-center mt-6">
              Read more <FiChevronRight className="ml-2" />
            </button>
          </div>{" "}
        </div>
      </div>
      <ContactComponent />
      <LogoClouds />
    </>
  );
};

export default Services;
