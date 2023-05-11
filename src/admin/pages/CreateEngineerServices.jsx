import React, { useState } from "react";
import { useFormik } from "formik";
import "../scss/adminadvocates.scss";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { toast, Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { createEngineerService } from "../../features/engineerServicesSlice";
import LangugaeService from "../services/LangugaeService";

const CreateEngineerServices = () => {
  const query = useQuery();
  const sub = Number(query.get("sub"));
  const [editortxt, setEditotxt] = useState("");
  const dispatch = useDispatch();

  const handleOnChange = (e, editor) => {
    setEditotxt(editor.getData());
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      subTitle: "",
      imageFile: "",
    },

    onSubmit: (values) => {
      try {
        var req = new FormData();
        req.append("title", values.title);
        req.append("subTitle", values.subTitle);
        req.append("information", editortxt);
        req.append("imageFile", values.imageFile);
        req.append("engineerServiceSubcategoryId", sub);
        req.append("languageCulture", LangugaeService.getCookies());
        dispatch(createEngineerService(req));
      } catch (error) {
        toast.error(error.response.data.Detail);
      }
    },
  });
  return (
    <div className="createadvocates">
      <Helmet>
        <title>Create Engineer Service</title>
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
        <label className="createadvocates__forms__label" htmlFor="title">
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
        <label className="createadvocates__forms__label" htmlFor="subTitle">
          Alt başlıq
        </label>
        <input
          className="createadvocates__forms__input"
          id="subTitle"
          name="subTitle"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.subTitle}
        />
        <label className="createadvocates__forms__label" htmlFor="information">
          Məlumat
        </label>
        <CKEditor editor={ClassicEditor} onChange={handleOnChange} />
        <button className="createadvocates__forms__button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default CreateEngineerServices;
