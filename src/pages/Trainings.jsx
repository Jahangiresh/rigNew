import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HeaderDown from "../components/header/HeaderDown";
import { FaList } from "react-icons/fa";
import { CgMenuGridR } from "react-icons/cg";
import { AiOutlineClockCircle } from "react-icons/ai";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Shape from "../components/Shape";
import FeaturedTrainings from "../components/FeaturedTrainings";
import { IMAGE_URL } from "../constants";
import LoadingBox from "../components/LoadingBox";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTrainings,
  getAllTrainings,
  getTrainingsError,
  getTrainingsPagination,
  getTrainingsStatus,
} from "../features/trainingsSlice";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

export const Trainings = () => {
  const { t, i18n } = useTranslation();
  const [list, setList] = useState(true);
  const [filter, setFilter] = useState(true);
  const query = useQuery();
  const sub = Number(query.get("sub"));
  const search = String(query.get("search"));
  // const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const dispatch = useDispatch();
  const trainings = useSelector(getAllTrainings);
  const pagination = useSelector(getTrainingsPagination);
  const status = useSelector(getTrainingsStatus);
  const error = useSelector(getTrainingsError);

  const memoizedFetchBlog = useMemo(() => {
    return () => {
      dispatch(
        fetchTrainings({
          search: search === "null" ? "" : search,
          pageNumber,
          sub,
          pageSize: 6,
          filter,
        })
      );
    };
  }, [dispatch, pageNumber, search, sub, filter]);

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
