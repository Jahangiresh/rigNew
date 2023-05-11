import React from "react";
import aboutsvg1 from "../assets/images/aboutvector1.svg";
import aboutsvg2 from "../assets/images/aboutvector2.svg";
import { FiChevronRight } from "react-icons/fi";

const AboutComponent = () => {
  return (
    <div className="my-14">
      <div className="container ">
        <div className="grid md:grid-cols-2  gap-x-5 w-full">
          <div className="w-full max-md:mb-10">
            <div className="img__div w-14 h-14 mb-7">
              <img
                className="w-full h-full object-cover"
                src={aboutsvg1}
                alt="jpg"
              />
            </div>
            <h1 className="text-[28px] font-bold text__black mb-3">About Us</h1>
            <p className="leading-8 text__black mb-6">
              Lorem ipsum dolor sit amet consectetur. Amet donec leo sit erat.
              Eleifend risus diam cursus dictum est Lorem ipsum dolor sit amet
              consectetur. Amet donec leo sit erat. Eleifend risus diam cursus
              dictum est Lorem ipsum dolor sit amet ...
            </p>
            <button className="flex btn__main items-center ">
              Read more <FiChevronRight className="ml-2" />{" "}
            </button>
          </div>
          <div className="w-full">
            <div className="img__div w-14 h-14 mb-7">
              <img
                className="w-full h-full object-cover"
                src={aboutsvg2}
                alt="jpg"
              />
            </div>
            <h1 className="text-[28px] font-bold text__black mb-3">
              Vision & Mission
            </h1>
            <p className="leading-8 text__black mb-6">
              Lorem ipsum dolor sit amet consectetur. Amet donec leo sit erat.
              Eleifend risus diam cursus dictum est Lorem ipsum dolor sit amet
              consectetur. Amet donec leo sit erat. Eleifend risus diam cursus
              dictum est Lorem ipsum dolor sit amet ...
            </p>
            <button className="flex btn__main items-center ">
              Read more <FiChevronRight className="ml-2" />{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutComponent;
