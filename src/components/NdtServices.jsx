import React, { useEffect } from "react";
import Slider from "react-slick";
import NdtServicesCard from "./NdtServicesCard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEngineerServices,
  getAllEngineerService,
  getEngineerServiceStatus,
} from "../features/engineerServicesSlice";
import LoadingBox from "./LoadingBox";
import { useTranslation } from "react-i18next";

const NdtServices = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const engineerServices = useSelector(getAllEngineerService);
  const status = useSelector(getEngineerServiceStatus);
  useEffect(() => {
    dispatch(
      fetchEngineerServices({ search: "", pageNumber: 1, filter: true })
    );
  }, [dispatch]);
  if (status === "lodaing") return <LoadingBox />;
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    cssEase: "ease-in-out",
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: engineerServices.length < 3 ? engineerServices.length : 3,
    slidesToScroll: 1,
    initialSlide: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow:
            engineerServices.length < 3 ? engineerServices.length : 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow:
            engineerServices.length < 2 ? engineerServices.length : 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      {engineerServices &&
        engineerServices.map((engineerService, index) => (
          <div key={index}>
            <NdtServicesCard engineerService={engineerService} />
          </div>
        ))}
    </Slider>
  );
};

export default NdtServices;

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        display: "block",
        background: "white",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
        color: "red",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        textAlign: "center",
      }}
      onClick={onClick}
    >
      <h1
        style={{
          color: "#e87813",
          margin: "0",
          position: "relative",
          right: "10px",
          fontSize: "18px",
        }}
      >
        {">"}
      </h1>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        display: "block",
        background: "white",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
      onClick={onClick}
    >
      <h1
        style={{
          color: "#e87813",
          margin: "0",
          position: "relative",
          right: "10px",
          fontSize: "18px",
        }}
      >
        {"<"}
      </h1>
    </div>
  );
}
