import React from "react";
import { useFormik } from "formik";
import "../scss/adminadvocates.scss";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { toast, Toaster } from "react-hot-toast";
import { createEquipmentsSubCategories } from "../../features/equipmentsSubCategoriesSlice";
import LangugaeService from "../services/LangugaeService";

const CreateEquipmentsCategory = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: "",
      imageFile: "",
    },

    onSubmit: (values) => {
      try {
        var req = new FormData();
        req.append("title", values.title);
        req.append("imageFile", values.imageFile);
        req.append("languageCulture", LangugaeService.getCookies());
        dispatch(createEquipmentsSubCategories({ req }));
      } catch (error) {
        toast.error(error.response.data.Detail);
      }
    },
  });
  return (
    <div className="createadvocates">
      <Helmet>
        <title>Create Equipments Category</title>
      </Helmet>
      <div>
        <Toaster />
      </div>
      <form className="createadvocates__forms" onSubmit={formik.handleSubmit}>
        <label className="createadvocates__forms__label" htmlFor="image">
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
        <label className="createadvocates__forms__label" htmlFor="firstName">
          Adı
        </label>
        <input
          className="createadvocates__forms__input"
          id="title"
          name="title"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.title}
        />
        <button className="createadvocates__forms__button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateEquipmentsCategory;
