import React, { useEffect, useReducer } from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import { ADMIN, BASE_URL, IMAGE_URL } from "../../constants";
import { toast, Toaster } from "react-hot-toast";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQ":
      return { ...state, loader: true };
    case "FETCH_SUCCES":
      return { ...state, slide: action.payload, loader: false };
    case "FETCH_FAIL":
      return { ...state, error: true };
    default:
      return state;
  }
};

const EditSlide = () => {
  const [{ loading, error, slide }, dispatch] = useReducer(reducer, {
    slide: {},
    loading: true,
    error: false,
  });
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const getSlide = async () => {
      dispatch({ type: "FETCH_REQ" });

      try {
        const resp = await axios.get(`
        ${BASE_URL}/sliders/${id}
        `);

        dispatch({ type: "FETCH_SUCCES", payload: resp.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL" });
        alert("err");
      }
    };
    getSlide();
  }, [id]);
  const { accessToken } = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";

  const formik = useFormik({
    initialValues: {
      order: slide.order,
      imageFile: slide.image,
    },
    onSubmit: async (values) => {
      try {
        await axios.put(
          `${BASE_URL}/sliders/${id}`,
          {
            order: values.order,
            imageFile: values.imageFile,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        window.location = `${ADMIN}/slides`;
      } catch (err) {
        toast.error(err.response.data?.title);
        Object.keys(err.response.data.errors).forEach((key) => {
          toast.error(err.response.data.errors[key]);
        });
      }
    },
  });
  return (
    <div className="createadvocates">
      <Helmet>
        <title>update slide</title>
      </Helmet>
      <div>
        <Toaster />
      </div>
      <img
        style={{
          width: "150px",
        }}
        src={`${IMAGE_URL}${slide.image && slide.image.filePath}`}
        alt=""
      />
      <form className="createadvocates__forms" onSubmit={formik.handleSubmit}>
        <label className="createadvocates__forms__label" htmlFor="image">
          image
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
          order
        </label>
        <input
          className="createadvocates__forms__input"
          id="order"
          name="order"
          type="number"
          onChange={formik.handleChange}
          defaultValue={slide.order}
        />

        <button className="createadvocates__forms__button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditSlide;
