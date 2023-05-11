import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { IMAGE_URL } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleCustomerComment,
  getSingleCustomerComment,
  updateCustomerComments,
  getSingleStatus,
} from "../../features/customerCommentSlice";
import LoadingBox from "../../components/LoadingBox";
import LangugaeService from "../services/LangugaeService";

const EditCustomerComments = () => {
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();
  const comment = useSelector(getSingleCustomerComment);
  const status = useSelector(getSingleStatus);

  useEffect(() => {
    dispatch(fetchSingleCustomerComment({ id }));
  }, [dispatch, id]);

  const formik = useFormik({
    initialValues: {
      fullname: "",
      role: "",
      comment: "",
      imageFile: "",
    },
    onSubmit: async (values) => {
      try {
        var req = new FormData();
        req.append("fullname", values.fullname);
        req.append("role", values.role);
        req.append("comment", values.comment);
        req.append("imageFile", values.imageFile);
        req.append("languageCulture", LangugaeService.getCookies());
        dispatch(updateCustomerComments({ req, id }));
      } catch (error) {
        toast.error(error.response.data.Detail);
      }
    },
  });

  if (status === "loading") {
    return <LoadingBox />;
  }

  return (
    <div className="createadvocates">
      <Helmet>
        <title>update blog</title>
      </Helmet>
      <img
        style={{
          width: "150px",
        }}
        src={`${IMAGE_URL}${comment.image && comment?.image?.filePath}`}
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
        <label className="createadvocates__forms__label" htmlFor="fullname">
          Ad Soyad
        </label>
        <input
          className="createadvocates__forms__input"
          id="fullname"
          name="fullname"
          type="text"
          onChange={formik.handleChange}
          defaultValue={comment.fullName}
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
          defaultValue={comment.role}
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
          defaultValue={comment.comment}
        />
        <button className="createadvocates__forms__button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditCustomerComments;
