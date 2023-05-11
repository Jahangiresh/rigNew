import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeaderDown from "../components/header/HeaderDown";
import Shape from "../components/Shape";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAccreditations,
  getAll,
  getError,
  getStatus,
} from "../features/accreditationsSlice";
import { useEffect } from "react";
import LoadingBox from "../components/LoadingBox";
import { IMAGE_URL } from "../constants";
import { BsThreeDots, BsXLg } from "react-icons/bs";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const Accreditations = () => {
  const { t, i18n } = useTranslation();
  const [length, setLength] = useState(false);
  const dispatch = useDispatch();
  const accreditations = useSelector(getAll);
  const status = useSelector(getStatus);
  const error = useSelector(getError);
  useEffect(() => {
    dispatch(fetchAccreditations());
  }, [dispatch]);
  if (status === "loading") return <LoadingBox />;
  return <h1>sa</h1>;
};

export default Accreditations;
