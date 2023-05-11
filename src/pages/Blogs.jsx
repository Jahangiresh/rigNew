import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import HeaderDown from "../components/header/HeaderDown";
import { AiOutlineCalendar } from "react-icons/ai";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Shape from "../components/Shape";
import FeaturedBlogs from "../components/FeaturedBlogs";
import LoadingBox from "../components/LoadingBox";
import { IMAGE_URL } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBlog,
  getAllBlogs,
  getStatus,
  getPagination,
} from "../features/blogSlice";
import { Toaster } from "react-hot-toast";
import ReactHtmlParser from "react-html-parser";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const Blogs = () => {
  const { t, i18n } = useTranslation();
  const query = useQuery();
  const search = String(query.get("search"));
  const dispatch = useDispatch();
  const blogs = useSelector(getAllBlogs);
  const pagination = useSelector(getPagination);
  const status = useSelector(getStatus);
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    dispatch(
      fetchBlog({ search: search === "null" ? "" : search, pageNumber })
    );
  }, [pageNumber, search, dispatch]);

  if (status === "loading") {
    return <LoadingBox />;
  }

  const handleChangePage = (event, newPage) => {
    setPageNumber(newPage);
  };

  return <h1>sa</h1>;
};

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

export default Blogs;
