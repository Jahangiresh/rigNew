import React from "react";
import { useFormik } from "formik";
import "../scss/adminadvocates.scss";
import { useDispatch } from "react-redux";
import { useState } from "react";
// import { createBLog } from "../../features/blogSlice";
import { Helmet } from "react-helmet";
import { toast, Toaster } from "react-hot-toast";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { createBlog } from "../../features/blogSlice";
import LangugaeService from "../services/LangugaeService";

const CreateBlog = () => {
  const [editortxt, setEditotxt] = useState("");
  const dispatch = useDispatch();

  const handleOnChange = (e, editor) => {
    setEditotxt(editor.getData());
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      imageFile: "",
      isFeatured: "true",
    },

    onSubmit: (values) => {
      try {
        var req = new FormData();
        req.append("title", values.title);
        req.append("body", editortxt);
        req.append("isFeatured", values.isFeatured);
        req.append("imageFile", values.imageFile);
        req.append("languageCulture", LangugaeService.getCookies());
        dispatch(createBlog(req));
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
        <label className="createadvocates__forms__label" htmlFor="firstName">
          başlıq
        </label>
        <input
          className="createadvocates__forms__input"
          id="title"
          name="title"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.title}
        />
        <label className="createadvocates__forms__label" htmlFor="body">
          məzmun
        </label>
        <CKEditor editor={ClassicEditor} onChange={handleOnChange} />
        <label
          className="createadvocates__forms__label"
          htmlFor="isFeatured"
          style={{ paddingTop: "10px" }}
        >
          Seçilmiş
        </label>
        <select
          className="createadvocates__forms__input"
          id="isFeatured"
          name="isFeatured"
          onChange={formik.handleChange}
          value={formik.values.isFeatured}
        >
          <option value="true">Hə</option>
          <option value="false">Yox</option>
        </select>
        <button className="createadvocates__forms__button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
