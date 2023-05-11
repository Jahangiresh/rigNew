import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import logo1 from "../assets/images/logo1.png";
import logo2 from "../assets/images/logo2.png";

const LogoClouds = () => {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    draggable: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="h-[219px] py-10">
      <div className="container">
        <h1 className="text-center text__black font-bold text-[28px] ">
          Our partners
        </h1>
        <Slider {...settings} className="h-full mt-10">
          <div className="px-4">
            <img
              className="h-full w-full  object-contain"
              src={logo2}
              alt="logo"
            />
          </div>
          <div className="px-4">
            <img
              className="h-full w-full  object-contain"
              src={logo2}
              alt="logo"
            />
          </div>{" "}
          <div className="px-4">
            <img
              className="h-full w-full  object-contain"
              src={logo2}
              alt="logo"
            />
          </div>{" "}
          <div className="px-4">
            <img
              className="h-full w-full  object-contain"
              src={logo2}
              alt="logo"
            />
          </div>{" "}
          <div className="px-4">
            <img
              className="h-full w-full  object-contain"
              src={logo2}
              alt="logo"
            />
          </div>{" "}
          <div className="px-4">
            <img
              className="h-full w-full  object-contain"
              src={logo2}
              alt="logo"
            />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default LogoClouds;
