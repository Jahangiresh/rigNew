import { Link } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { IMAGE_URL } from "../constants";
import { fetchPartners, getAll, getStatus } from "../features/partnersSlice";
import LoadingBox from "./LoadingBox";
import { useTranslation } from "react-i18next";

const Partners = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const partners = useSelector(getAll);
  const status = useSelector(getStatus);
  useEffect(() => {
    dispatch(fetchPartners());
  }, [dispatch]);
  if (status === "loading") {
    return <LoadingBox />;
  }

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    cssEase: "ease-in-out",
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: partners.length < 5 ? partners.length : 5,
    slidesToScroll: 1,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: partners.length < 3 ? partners.length : 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: partners.length < 2 ? partners.length : 2,
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
  return <h1>sa</h1>;
};

export default Partners;
