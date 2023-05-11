import React from "react";
import { Link, useParams } from "react-router-dom";
import HeaderDown from "../components/header/HeaderDown";
import Shape from "../components/Shape";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleEquipment,
  getSingleEquipments,
  getSingleError,
  getSingleStatus,
} from "../features/equipmentsSlice";
import { useEffect } from "react";
import LoadingBox from "../components/LoadingBox";
import ReactHtmlParser from "react-html-parser";
import { IMAGE_URL } from "../constants";
import NotFound from "./NotFound";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const EquipmentsDetail = () => {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();
  const equipment = useSelector(getSingleEquipments);
  const status = useSelector(getSingleStatus);
  const error = useSelector(getSingleError);
  useEffect(() => {
    dispatch(fetchSingleEquipment({ id }));
  }, [dispatch, id]);
  if (status === "loading") return <LoadingBox />;
  if (error.code === "ERR_BAD_REQUEST") {
    return <NotFound />;
  }
  const settings = {
    dots: false,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return <h1>sa</h1>;
};

export default EquipmentsDetail;

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        // padding: "20px",
        display: "flex",
        backgroundColor: "transparent",
        color: "transparent",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          color: "#666",
          margin: "0",
          position: "relative",
          right: "10px",
          fontSize: "50px",
          fontWeight: "200",
        }}
        onClick={onClick}
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
        ...style,
        display: "block",
        padding: "20px",
        display: "flex",
        backgroundColor: "#f5f4f9",
        justifyContent: "center",
        alignItems: "center",
        color: "red",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          color: "#666",
          margin: "0",
          position: "relative",
          right: "20px",
          fontSize: "50px",
          fontWeight: "200",
        }}
        onClick={onClick}
      >
        {"<"}
      </h1>
    </div>
  );
}
