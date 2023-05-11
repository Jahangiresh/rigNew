import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { toast, Toaster } from "react-hot-toast";
import { IMAGE_URL } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../../components/LoadingBox";
import {
  fetchSingleEquipmentsSubCategories,
  getSingleEquipmentsSubcategories,
  getSingleStatus,
  updateEquipmentsSubCategories,
} from "../../features/equipmentsSubCategoriesSlice";
import LangugaeService from "../services/LangugaeService";

const EditEquipmentsCategory = () => {
  const params = useParams();
  const id = Number(params.id);
  const dispatch = useDispatch();
  const enginerServicesSubcategory = useSelector(
    getSingleEquipmentsSubcategories
  );
  const status = useSelector(getSingleStatus);

  useEffect(() => {
    dispatch(fetchSingleEquipmentsSubCategories({ id }));
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
        dispatch(updateEquipmentsSubCategories({ req, id }));
      } catch (error) {
        toast.error(error.response.data.Detail);
      }
    },
  });

  if (status === "loading") return <LoadingBox />;

  return (
    <div className="createadvocates">
      <Helmet>
        <title>update engineer services sub</title>
      </Helmet>
      <img
        style={{
          width: "150px",
        }}
        src={`${IMAGE_URL}${
          enginerServicesSubcategory?.image &&
          enginerServicesSubcategory?.image?.filePath
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
          defaultValue={enginerServicesSubcategory?.title}
        />
        <button className="createadvocates__forms__button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditEquipmentsCategory;
