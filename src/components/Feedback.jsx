import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { fetchFeedback, getAll, getStatus } from "../features/feedbackSlice";
import FeedbackCard from "./FeedbackCard";
import LoadingBox from "./LoadingBox";
import { useTranslation } from "react-i18next";

const Feedback = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const feedback = useSelector(getAll);
  const status = useSelector(getStatus);
  useEffect(() => {
    dispatch(fetchFeedback());
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
    slidesToShow: feedback.length < 2 ? feedback.length : 2,
    slidesToScroll: 1,
    initialSlide: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
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
      {feedback.map((feed, index) => (
        <div key={index}>
          <FeedbackCard feedback={feed} />
        </div>
      ))}
    </Slider>
  );
};

export default Feedback;

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <h1>{">"}</h1>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <h1>{"<"}</h1>
    </div>
  );
}
