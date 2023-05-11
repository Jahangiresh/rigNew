import React, { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import HeaderDown from "../components/header/HeaderDown";
import Shape from "../components/Shape";
import TrainingsSubCategory from "../components/TrainingsSubCategory";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEngineerServicesSubCategories,
  getAllEnginerServicesSubcategories,
} from "../features/engineerServicesSubCategoriesSlice";
import { IMAGE_URL } from "../constants";
import { Helmet } from "react-helmet";

const EngineerServicesCategory = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const subCategories = useSelector(getAllEnginerServicesSubcategories);
  useEffect(() => {
    dispatch(fetchEngineerServicesSubCategories());
  }, [dispatch]);

  return <h1>sa</h1>;
};

export default EngineerServicesCategory;
