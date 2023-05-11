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
import LoadingBox from "../../components/LoadingBox";
import {
  fetchSingleEngineerService,
  getSingleEngineerService,
  getSingleStatus,
  updateEngineerService,
} from "../../features/engineerServicesSlice";
import LangugaeService from "../services/LangugaeService";

const EditEngineerServices = () => {
  const params = useParams();
  const id = params.id;
  const [editortxt, setEditotxt] = useState("");
  const dispatch = useDispatch();
  const engineerService = useSelector(getSingleEngineerService);
  const status = useSelector(getSingleStatus);

  useEffect(() => {
    dispatch(fetchSingleEngineerService({ id }));
  }, [dispatch, id]);

  const handleOnChange = (e, editor) => {
    setEditotxt(editor.getData());
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      subTitle: "",
      imageFile: "",
    },
    onSubmit: async (values) => {
      try {
        var req = new FormData();
        req.append("title", values.title);
        req.append("subTitle", values.subTitle);
        req.append("information", editortxt);
        req.append("imageFile", values.imageFile);
        req.append("languageCulture", LangugaeService.getCookies());
        dispatch(updateEngineerService({ req, id }));
      } catch (error) {
        toast.error(error.response.data.Detail);
      }
    },
  });

  if (status === "loading") return <LoadingBox />;

  return (
    <div className="createadvocates">
      <Helmet>
        <title>Update Training</title>
      </Helmet>
      <img
        style={{
          width: "150px",
        }}
        src={`${IMAGE_URL}${
          engineerService.image && engineerService?.image?.filePath
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
          Başlıq
        </label>
        <input
          className="createadvocates__forms__input"
          id="title"
          name="title"
          type="text"
          onChange={formik.handleChange}
          defaultValue={engineerService.title}
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
          defaultValue={engineerService.subTitle}
        />
        <label className="createadvocates__forms__label" htmlFor="body">
          Məlumat
        </label>
        <CKEditor
          editor={ClassicEditor}
          onChange={handleOnChange}
          data={engineerService.information}
        />
        <button className="createadvocates__forms__button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditEngineerServices;
