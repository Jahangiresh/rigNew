import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import HeaderDown from "../components/header/HeaderDown";
import Shape from "../components/Shape";
import TrainingsSubCategory from "../components/TrainingsSubCategory";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { BASE_URL } from "../constants";
import axios from "axios";

const TrainingsCategory = () => {
  const { t, i18n } = useTranslation();
  const query = useQuery();
  const category = Number(query.get("category"));
  const params = useParams();
  const id = Number(params.id);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      await axios.get(`${BASE_URL}/categories`).then((res) => {
        setCategories(res?.data?.slice(0, 2));
      });
    };
    getCategory();
  }, []);

  return <h1>sa</h1>;
};

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

export default TrainingsCategory;
