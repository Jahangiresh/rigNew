import React from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import ContactComponent from "../../components/ContactComponent";
import LogoClouds from "../../components/LogoClouds";

import banner1 from "../../assets/images/banner1.svg";
import banner2 from "../../assets/images/banner2.svg";
import { FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
const Products = () => {
  const navigate = useNavigate();

  return (
    <>
      <Breadcrumbs title={"Products"} />
      <div className="container grid max-md:grid-cols-1 grid-cols-2 h-auto py-10 gap-x-3">
        <div className="relative  h-[346px]  w-full flex  justify-center flex-col px-24 max-lg:px-10 ">
          <img
            className="absolute object-cover !w-full h-full top-0 left-0 -z-10"
            src={banner1}
            alt="banner"
          />
          <div className="content flex flex-col justify-center   h-full">
            <h2 className="text-white font-bold text-2xl ">
              Lifting equipment and accessories
            </h2>
            <p className="my-4 text-white lg:leading-2 ">
              Lorem ipsum dolor sit amet consectetur. Amet donec leo sit erat.
              Eleifend risus diam cursus dictum est Lorem ipsum dolor sit amet
              consectetur. Amet donec leo sit erat. Eleifend
            </p>
            <button
              onClick={() => navigate("/products/10")}
              className="btn__secondary flex items-center w-44"
            >
              Read more <FiChevronRight className="ml-2" />
            </button>
          </div>
        </div>
        <div className="relative  h-[346px]  w-full flex  justify-center flex-col px-24 max-lg:px-10 ">
          <img
            className="absolute object-cover !w-full h-full top-0 left-0 -z-10"
            src={banner2}
            alt="banner"
          />
          <div className="content flex flex-col justify-center   h-full">
            <h2 className="text-white font-bold text-2xl ">
              Equipment for Work at Height
            </h2>
            <p className="my-4 text-white lg:leading-2 ">
              Lorem ipsum dolor sit amet consectetur. Amet donec leo sit erat.
              Eleifend risus diam cursus dictum est Lorem ipsum dolor sit amet
              consectetur. Amet donec leo sit erat. Eleifend
            </p>
            <button className="btn__secondary flex items-center w-44">
              Read more <FiChevronRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>
      <ContactComponent />
      <LogoClouds />
    </>
  );
};

export default Products;
