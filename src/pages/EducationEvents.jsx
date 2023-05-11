import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HeaderDown from "../components/header/HeaderDown";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Shape from "../components/Shape";
import FeaturedTrainings from "../components/FeaturedTrainings";
import { IMAGE_URL } from "../constants";
import LoadingBox from "../components/LoadingBox";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEducationEvents,
  getAllEducationEvents,
  getError,
  getPagination,
  getStatus,
} from "../features/educationEventsSlice";
import ReactHtmlParser from "react-html-parser";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

export const EducationEvents = () => {
  const { t, i18n } = useTranslation();
  const [list, setList] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const educationEvents = useSelector(getAllEducationEvents);
  const pagination = useSelector(getPagination);
  const status = useSelector(getStatus);
  const error = useSelector(getError);

  const memoizedFetchBlog = useMemo(() => {
    return () => {
      dispatch(
        fetchEducationEvents({
          pageNumber,
        })
      );
    };
  }, [dispatch, pageNumber]);

  useEffect(() => {
    memoizedFetchBlog();
  }, [memoizedFetchBlog]);

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
