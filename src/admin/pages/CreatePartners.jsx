import React from "react";
import { useFormik } from "formik";
import "../scss/adminadvocates.scss";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { toast, Toaster } from "react-hot-toast";
import { createPartner } from "../../features/partnersSlice";

const CreatePartners = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      imageFile: "",
      urlLink: "",
    },

    onSubmit: (values) => {
      try {
        var req = new FormData();
        req.append("imageFile", values.imageFile);
        req.append("urlLink", values.urlLink);
        dispatch(createPartner(req));
      } catch (error) {
        toast.error(error.response.data.Detail);
      }
    },
  });
  return (
    <div className="createadvocates">
      <Helmet>
        <title>create blog</title>
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
        <label className="createadvocates__forms__label" htmlFor="urlLink">
          Link
        </label>
        <input
          className="createadvocates__forms__input"
          id="urlLink"
          name="urlLink"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.urlLink}
        />
        <button className="createadvocates__forms__button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePartners;
