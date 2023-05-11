import React, { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoadingBox from "./LoadingBox";
import {
  fetchFeaturedTrainings,
  getFeaturedStatus,
  getFeaturedTraining,
} from "../features/trainingsSlice";
import { IMAGE_URL } from "../constants";
import { useTranslation } from "react-i18next";

const FeaturedTrainings = () => {
  const { t, i18n } = useTranslation();
  const searchRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const trainings = useSelector(getFeaturedTraining);
  const status = useSelector(getFeaturedStatus);

  useEffect(() => {
    dispatch(fetchFeaturedTrainings());
  }, [dispatch]);

  if (status === "loading") return <LoadingBox />;

  return <h1>sa</h1>;
};

export default FeaturedTrainings;
