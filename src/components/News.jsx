import React from "react";
import Slider from "react-slick";
import NewsCard from "./NewsCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlog, getAllBlogs, getStatus } from "../features/blogSlice";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import LoadingBox from "./LoadingBox";

const News = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const blogs = useSelector(getAllBlogs);
  const status = useSelector(getStatus);
  useEffect(() => {
    dispatch(fetchBlog({ search: "", pageNumber: 1 }));
  }, [dispatch]);
  if (status === "loading") return <LoadingBox />;
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    cssEase: "ease-in-out",
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: blogs.length < 3 ? blogs.length : 3,
    slidesToScroll: 1,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
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
    <div className="slider-wrapper">
      <Slider {...settings}>
        {blogs &&
          blogs.map((blog, index) => (
            <div style={{ height: "100%" }} key={index}>
              <NewsCard blog={blog} />
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default News;
