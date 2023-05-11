import React from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IMAGE_URL } from "../constants";
import {
  fetchFeaturedBlog,
  getFeaturedBlogs,
  getFeaturedStatus,
} from "../features/blogSlice";
import { useEffect } from "react";
import LoadingBox from "./LoadingBox";
import { useTranslation } from "react-i18next";

const FeaturedBlogs = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const blogs = useSelector(getFeaturedBlogs);
  const status = useSelector(getFeaturedStatus);
  const navigate = useNavigate();
  const searchRef = useRef();
  useEffect(() => {
    dispatch(fetchFeaturedBlog());
  }, [dispatch]);
  if (status === "loading") return <LoadingBox />;
  return <h1>sa</h1>;
};

export default FeaturedBlogs;
