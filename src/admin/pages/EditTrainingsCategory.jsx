import React, { useEffect, useMemo } from "react";
import { useFormik } from "formik";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { toast, Toaster } from "react-hot-toast";
import { IMAGE_URL } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../../components/LoadingBox";
import {
  fetchSingleTrainingsSubCategories,
  getSingleStatus,
  getSingleTrainingsSubcategories,
  updateTrainingsSubCategories,
} from "../../features/trainingssubcategoriesslice";
import LangugaeService from "../services/LangugaeService";

const EditTrainingsCategory = () => {
  const query = useQuery();
  const sub = Number(query.get("sub"));
  const dispatch = useDispatch();
  const trainingSubcategory = useSelector(getSingleTrainingsSubcategories);
  const status = useSelector(getSingleStatus);

  useEffect(() => {
    dispatch(fetchSingleTrainingsSubCategories({ id: sub }));
  }, [dispatch, sub]);

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
        dispatch(updateTrainingsSubCategories({ req, id: sub }));
      } catch (error) {
        toast.error(error.response.data.Detail);
      }
    },
  });

  if (status === "loading") return <LoadingBox />;

  return (
    <div className="createadvocates">
      <Helmet>
        <title>update blog</title>
      </Helmet>
      <img
        style={{
          width: "150px",
        }}
        src={`${IMAGE_URL}${
          trainingSubcategory.image && trainingSubcategory.image.filePath
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
          defaultValue={trainingSubcategory.title}
        />
        <button className="createadvocates__forms__button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

export default EditTrainingsCategory;
