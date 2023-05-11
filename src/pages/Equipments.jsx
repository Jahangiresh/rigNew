import React, { useState } from "react";
import HeaderDown from "../components/header/HeaderDown";
import { Link, useNavigate } from "react-router-dom";
import Shape from "../components/Shape";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Pagination,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEquipments,
  getAllEquipments,
  getEquipmentsPagination,
  getEquipmentsStatus,
} from "../features/equipmentsSlice";
import { useEffect } from "react";
import LoadingBox from "../components/LoadingBox";
import { IMAGE_URL } from "../constants";
import ReactHtmlParser from "react-html-parser";
import {
  fetchEquipmentsSubCategories,
  getAllEquipmentsSubcategories,
  getStatus,
} from "../features/equipmentsSubCategoriesSlice";
import { useRef } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const Equipments = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [selectedSubId, setSelectedSubId] = useState(null);
  const dispatch = useDispatch();
  const equipments = useSelector(getAllEquipments);
  const pagination = useSelector(getEquipmentsPagination);
  const status = useSelector(getEquipmentsStatus);
  const equipmentSubCategories = useSelector(getAllEquipmentsSubcategories);
  const subStatus = useSelector(getStatus);
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState("");
  const searchRef = useRef();
  useEffect(() => {
    dispatch(fetchEquipmentsSubCategories());
    dispatch(fetchEquipments({ search, pageNumber, sub: selectedSubId }));
  }, [dispatch, pageNumber, selectedSubId, search]);
  if (status === "loading" || subStatus === "loading") return <LoadingBox />;
  const handleChangePage = (event, newPage) => {
    setPageNumber(newPage);
  };
  return <h1>sa</h1>;
};

export default Equipments;
