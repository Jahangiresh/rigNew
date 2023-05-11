import React from "react";
import { useFormik } from "formik";
import "../scss/adminadvocates.scss";
import { useDispatch } from "react-redux";
import { createSlide } from "../../features/slideSlice";
import { Helmet } from "react-helmet";
import { toast, Toaster } from "react-hot-toast";
const CreateSlide = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      order: "",
      imageFile: "",
    },

    onSubmit: (values) => {
      try {
        var req = new FormData();
        req.append("order", values.order);
        req.append("imageFile", values.imageFile);
        dispatch(createSlide(req));
      } catch (error) {
        toast.error(error);
      }
    },
  });
  return (
    <div className="createadvocates">
      <Helmet>
        <title>add slide</title>
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
        <label className="createadvocates__forms__label" htmlFor="order">
          sıra
        </label>
        <input
          className="createadvocates__forms__input"
          id="order"
          name="order"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.order}
        />

        <button className="createadvocates__forms__button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateSlide;
