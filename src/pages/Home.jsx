import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsMap } from "react-icons/bs";
import { BiBriefcaseAlt } from "react-icons/bi";
import { BiUserCheck } from "react-icons/bi";
import { FiCpu } from "react-icons/fi";
import { RiTruckLine } from "react-icons/ri";
import TrainingsSubCategory from "../components/TrainingsSubCategory";
import NdtServices from "../components/NdtServices";
import UserCount from "../components/UserCount";
import Feedback from "../components/Feedback";
import News from "../components/News";
import Partners from "../components/Partners";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL, IMAGE_URL } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { getAllSlides, slideFetch, getStatus } from "../features/slideSlice";
import LoadingBox from "../components/LoadingBox";
import { Helmet } from "react-helmet";
import AboutComponent from "../components/AboutComponent";
import ServicesComponent from "../components/Services/ServicesComponent";
import ProductBanner from "../components/Products/ProductBanner";
import ContactComponent from "../components/ContactComponent";
import LogoClouds from "../components/LogoClouds";
import coverHomeSvg from "../assets/images/coverhome.svg";

const Home = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const searchRef = useRef();
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const slides = useSelector(getAllSlides);
  const status = useSelector(getStatus);
  useEffect(() => {
    const getCategory = async () => {
      await axios
        .get(`${BASE_URL}/categories`)
        .then((res) => {
          setCategories(res.data);
        })
        .catch((err) => {});
    };
    getCategory();
  }, [dispatch]);
  useEffect(() => {
    dispatch(slideFetch());
  }, [dispatch]);
  if (status === "loading") return <LoadingBox />;
  var settings = {
    infinite: true,
    speed: 2000,
    cssEase: "ease-in-out",
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    dots: false,
    pauseOnHover: false,
  };

  return (
    <div>
      <div className="cover h-[524px]  text-center relative w-full flex justify-center items-center">
        <img
          className="absolute top-0 left-0 h-full w-full object-cover -z-10"
          src={coverHomeSvg}
          alt=""
        />
        <div className="cover__content  w-[772px] max-sm:w-full max-sm:px-1 ">
          <h1 className="font-bold text-white text-[38px] max-sm:text-[28px] max-sm:leading-2">
            Lorem ipsum dolor sit amet consectetur. Amet donec leo sit erat.
            <span className="text__yellow">Eleifend risus</span> diam cursus
            dictum est
          </h1>
          <p className=" text-white sm:text-xl mt-6 max-sm:leading-8">
            Lorem ipsum dolor sit amet consectetur. Amet donec leo sit erat.
            Eleifend risus diam cursus dictum est Lorem ipsum dolor sit amet
            consectetur. Amet donec leo sit erat. Eleifend risus diam cursus
            dictum est
          </p>
        </div>
      </div>
      <AboutComponent />
      <ServicesComponent />
      <ProductBanner />
      <ContactComponent />
      <LogoClouds />
    </div>
  );
};

export default Home;
