import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HeaderDown from "../components/header/HeaderDown";
import { FaList } from "react-icons/fa";
import { CgMenuGridR } from "react-icons/cg";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Shape from "../components/Shape";
import FeaturedTrainings from "../components/FeaturedTrainings";
import LoadingBox from "../components/LoadingBox";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEngineerServices,
  getAllEngineerService,
  getEngineerServicePagination,
  getEngineerServiceStatus,
} from "../features/engineerServicesSlice";
import { IMAGE_URL } from "../constants";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

export const EngineerServices = () => {
  const { t, i18n } = useTranslation();
  const [list, setList] = useState(true);
  const [filter, setFilter] = useState(true);
  const query = useQuery();
  const sub = Number(query.get("sub"));
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();
  const engineerServices = useSelector(getAllEngineerService);
  const pagination = useSelector(getEngineerServicePagination);
  const status = useSelector(getEngineerServiceStatus);
  const memoizedFetchBlog = useMemo(() => {
    return () => {
      dispatch(
        fetchEngineerServices({
          search: "",
          pageNumber,
          sub,
          filter,
        })
      );
    };
  }, [dispatch, pageNumber, sub, filter]);

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
