import React from "react";
import banner1 from "../../assets/images/banner1.svg";
import banner2 from "../../assets/images/banner2.svg";
import { FiChevronRight } from "react-icons/fi";

const ProductBanner = () => {
  return (
    <div className="grid max-md:grid-cols-1 grid-cols-2 h-auto">
      <div className="relative  h-[364px]  w-full flex  justify-center flex-col px-24 max-lg:px-10">
        <img
          className="absolute object-cover !w-full h-full top-0 left-0 -z-10"
          src={banner1}
          alt="banner"
        />
        <div className="content flex flex-col justify-center   h-full">
          <h2 className="text-white font-bold text-3xl max-lg:text-2xl ">
            Lifting equipment and accessories
          </h2>
          <p className="my-4 text-white lg:leading-8 ">
            Lorem ipsum dolor sit amet consectetur. Amet donec leo sit erat.
            Eleifend risus diam cursus dictum est Lorem ipsum dolor sit amet
            consectetur. Amet donec leo sit erat. Eleifend
          </p>
          <button className="btn__secondary flex items-center w-44">
            Read more <FiChevronRight className="ml-2" />
          </button>
        </div>
      </div>
      <div className="relative  h-[364px]  w-full flex  justify-center flex-col px-24 max-lg:px-10">
        <img
          className="absolute object-cover !w-full h-full top-0 left-0 -z-10"
          src={banner2}
          alt="banner"
        />
        <div className="content flex flex-col justify-center h-full">
          <h2 className="text-white font-bold text-3xl max-lg:text-2xl ">
            Equipment for Work at Height
          </h2>
          <p className="my-4 text-white lg:leading-8 ">
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
  );
};

export default ProductBanner;
