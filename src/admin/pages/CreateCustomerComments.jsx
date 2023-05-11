import React from "react";
import { useFormik } from "formik";
import "../scss/adminadvocates.scss";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { toast, Toaster } from "react-hot-toast";
import { createCustomerComments } from "../../features/customerCommentSlice";
import LangugaeService from "../services/LangugaeService";

const CreateCustomerComments = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      fullname: "",
      role: "",
      comment: "",
      imageFile: "",
    },

    onSubmit: (values) => {
      try {
        var req = new FormData();
        req.append("fullname", values.fullname);
        req.append("role", values.role);
        req.append("comment", values.comment);
        req.append("imageFile", values.imageFile);
        req.append("languageCulture", LangugaeService.getCookies());
        dispatch(createCustomerComments(req));
      } catch (error) {
        toast.error(error.response.data.Detail);
      }
    },
  });
  return (
    <div className="createadvocates">
      <Helmet>
        <title>create comments</title>
      </Helmet>
      <div>
        <Toaster />
      </div>
      <form className="createadvocates__forms" onSubmit={formik.handleSubmit}>
        <label className="createadvocates__forms__label" htmlFor="imageFile">
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
        <label className="createadvocates__forms__label" htmlFor="fullname">
          Ad Soyad
        </label>
        <input
          className="createadvocates__forms__input"
          id="fullname"
          name="fullname"
          type="text"
          onChange={formik.handleChange}
          defaultValue={formik.values.fullname}
        />
        <label className="createadvocates__forms__label" htmlFor="role">
          Vəzifə
        </label>
        <input
          className="createadvocates__forms__input"
          id="role"
          name="role"
          type="text"
          onChange={formik.handleChange}
          defaultValue={formik.values.role}
        />
        <label className="createadvocates__forms__label" htmlFor="comment">
          Rəy
        </label>
        <input
          className="createadvocates__forms__input"
          id="comment"
          name="comment"
          type="text"
          onChange={formik.handleChange}
          defaultValue={formik.values.comment}
        />
        <button className="createadvocates__forms__button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateCustomerComments;
