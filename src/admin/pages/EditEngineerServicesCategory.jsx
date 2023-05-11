import React, { useEffect, useMemo, useReducer } from "react";
import { useFormik } from "formik";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { ADMIN, BASE_URL, IMAGE_URL } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../../components/LoadingBox";
import {
  fetchSingleEngineerServicesSubCategories,
  getSingleEnginerServicesSubcategories,
  getSingleStatus,
  updateEngineerServicesSubCategories,
} from "../../features/engineerServicesSubCategoriesSlice";
import LangugaeService from "../services/LangugaeService";

const EditEngineerServicesCategory = () => {
  const params = useParams();
  const id = Number(params.id);
  const dispatch = useDispatch();
  const equipmentsSubcategory = useSelector(
    getSingleEnginerServicesSubcategories
  );
  const status = useSelector(getSingleStatus);

  useEffect(() => {
    dispatch(fetchSingleEngineerServicesSubCategories({ id }));
  }, [dispatch, id]);

  const formik = useFormik({
    initialValues: {
      title: "",
      imageFile: "",
    },
    onSubmit: async (values) => {
      try {
        var req = new FormData();
        req.append("title", values.title);
        req.append("imageFile", values.imageFile);
        req.append("languageCulture", LangugaeService.getCookies());
        dispatch(updateEngineerServicesSubCategories({ req, id }));
      } catch (error) {
        toast.error(error.response.data.Detail);
      }
    },
  });

  if (status === "loading") return <LoadingBox />;

  return (
    <div className="createadvocates">
      <Helmet>
        <title>update equipments sub category</title>
      </Helmet>
      <img
        style={{
          width: "150px",
        }}
        src={`${IMAGE_URL}${
          equipmentsSubcategory?.image && equipmentsSubcategory?.image?.filePath
        }`}
        alt=""
      />
      <div>
        <Toaster />
      </div>
      <form className="createadvocates__forms" onSubmit={formik.handleSubmit}>
        <label className="createadvocates__forms__label mb-2" htmlFor="image">
          şəkil
        </label>
        <input
          className="createadvocates__forms__input"
          id="image"
          name="imageFile"
          accept="image/*"
          type="file"
          onChange={(e) => {
            formik.setFieldValue("imageFile", e.currentTarget.files[0]);
          }}
        />
        <label className="createadvocates__forms__label" htmlFor="title">
          başlıq
        </label>
        <input
          className="createadvocates__forms__input"
          id="title"
          name="title"
          type="text"
          onChange={formik.handleChange}
          defaultValue={equipmentsSubcategory?.title}
        />
        <button className="createadvocates__forms__button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditEngineerServicesCategory;
