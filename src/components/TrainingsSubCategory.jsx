import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TrainingsSubCategoryCard from "./TrainingsSubCategoryCard";
import {
  fetchTrainingsSubCategories,
  getAllTrainingsSubcategories,
  getError,
  getStatus,
} from "../features/trainingssubcategoriesslice";
import LoadingBox from "./LoadingBox";
import { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";

const TrainingsSubCategory = ({ category }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const subCategories = useSelector(getAllTrainingsSubcategories);
  const status = useSelector(getStatus);
  const error = useSelector(getError);
  useEffect(() => {
    dispatch(fetchTrainingsSubCategories({ categoryId: category }));
  }, [dispatch, category]);

  if (status === "loading") return <LoadingBox />;

  return (
    <div className={`row`}>
      <Toaster />
      {subCategories &&
        subCategories.map((subCategory, index) => (
          <TrainingsSubCategoryCard key={index} subCategory={subCategory} />
        ))}
    </div>
  );
};

export default TrainingsSubCategory;
