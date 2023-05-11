import React from "react";
import { Link, useParams } from "react-router-dom";
import HeaderDown from "../components/header/HeaderDown";
import Shape from "../components/Shape";
import FeaturedBlogs from "../components/FeaturedBlogs";
import { AiOutlineCalendar } from "react-icons/ai";
import { useEffect } from "react";
import { IMAGE_URL } from "../constants";
import LoadingBox from "../components/LoadingBox";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "./NotFound";
import { Toaster } from "react-hot-toast";
import {
  fetchSingleBlog,
  getSingleError,
  getSingleBlogs,
  getSingleStatus,
} from "../features/blogSlice";
import ReactHtmlParser from "react-html-parser";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const BlogsDetail = () => {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const id = Number(params.id);
  const dispatch = useDispatch();
  const blog = useSelector(getSingleBlogs);
  const status = useSelector(getSingleStatus);
  const error = useSelector(getSingleError);
  useEffect(() => {
    dispatch(fetchSingleBlog({ id }));
  }, [dispatch, id]);

  if (error.code === "ERR_BAD_REQUEST") {
    return <NotFound />;
  }
  if (status === "loading") {
    return <LoadingBox />;
  }
  return <h1>sa</h1>;
};

export default BlogsDetail;
