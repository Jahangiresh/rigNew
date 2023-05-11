import React from "react";
import servicesvg from "../../assets/images/servicesvector.svg";
import { FiChevronRight } from "react-icons/fi";

const ServicesCard = () => {
  return (
    <div className="grid md:grid-cols-3 gap-x-20 max-md:gap-y-10">
      <div className="flex flex-col items-center">
        <div className="serviceimage w-[61px] h-[61px] mb-7">
          <img className="w-full h-full object-cover" src={servicesvg} alt="" />
        </div>
        <h2 className="text-white font-bold text-xl ">Inspection</h2>
        <p className="my-4 text-white text-center">
          Lorem ipsum dolor sit amet consectetur. Amet donec leo sit erat.
          Eleifend risus diam cursus dictum est Lorem ipsum dolor sit amet
          consectetur. Amet donec leo sit erat...
        </p>
        <button className="btn__secondary flex items-center">
          Read more <FiChevronRight className="ml-2" />
        </button>
      </div>{" "}
      <div className="flex flex-col items-center">
        <div className="serviceimage w-[61px] h-[61px] mb-7">
          <img className="w-full h-full object-cover" src={servicesvg} alt="" />
        </div>
        <h2 className="text-white font-bold text-xl ">Inspection</h2>
        <p className="my-4 text-white text-center">
          Lorem ipsum dolor sit amet consectetur. Amet donec leo sit erat.
          Eleifend risus diam cursus dictum est Lorem ipsum dolor sit amet
          consectetur. Amet donec leo sit erat ...
        </p>
        <button className="btn__secondary flex items-center">
          Read more <FiChevronRight className="ml-2" />
        </button>
      </div>{" "}
      <div className="flex flex-col items-center">
        <div className="serviceimage w-[61px] h-[61px] mb-7">
          <img className="w-full h-full object-cover" src={servicesvg} alt="" />
        </div>
        <h2 className="text-white font-bold text-xl ">Inspection</h2>
        <p className="my-4 text-white text-center">
          Lorem ipsum dolor sit amet consectetur. Amet donec leo sit erat.
          Eleifend risus diam cursus dictum est Lorem ipsum dolor sit amet
          consectetur. Amet donec leo sit erat...
        </p>
        <button className="btn__secondary flex items-center">
          Read more <FiChevronRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default ServicesCard;
