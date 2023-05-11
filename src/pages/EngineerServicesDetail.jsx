import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Shape from "../components/Shape";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { FaLinkedinIn } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { GoClock } from "react-icons/go";
import FeaturedTrainings from "../components/FeaturedTrainings";
import { IMAGE_URL } from "../constants";
import LoadingBox from "../components/LoadingBox";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "./NotFound";
import {
  fetchSingleEngineerService,
  getSingleEngineerService,
  getSingleError,
  getSingleStatus,
} from "../features/engineerServicesSlice";
import ReactHtmlParser from "react-html-parser";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const EngineerServiceDetail = () => {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const id = Number(params.id);
  const dispatch = useDispatch();
  const engineerService = useSelector(getSingleEngineerService);
  const status = useSelector(getSingleStatus);
  const error = useSelector(getSingleError);

  useEffect(() => {
    dispatch(fetchSingleEngineerService({ id }));
  }, [dispatch, id]);

  if (status === "loading") {
    return <LoadingBox />;
  }

  if (error.code === "ERR_BAD_REQUEST") {
    return <NotFound />;
  }

  return <h1>sa</h1>;
};

export default EngineerServiceDetail;
