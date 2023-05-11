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
  getSingleTraining,
  getSingleStatus,
  fetchSingleTraining,
  updateTraining,
} from "../../features/trainingsSlice";
import LoadingBox from "../../components/LoadingBox";
import LangugaeService from "../services/LangugaeService";

const EditTrainings = () => {
  const params = useParams();
  const id = params.id;
  const [editortxt, setEditotxt] = useState("");
  const dispatch = useDispatch();
  const training = useSelector(getSingleTraining);
  const status = useSelector(getSingleStatus);

  useEffect(() => {
    dispatch(fetchSingleTraining({ id }));
  }, [dispatch, id]);

  const handleOnChange = (e, editor) => {
    setEditotxt(editor.getData());
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      subTitle: "",
      durationTime: "",
      imageFile: "",
    },
    onSubmit: async (values) => {
      try {
        var req = new FormData();
        req.append("title", values.title);
        req.append("subTitle", values.subTitle);
        req.append("information", editortxt);
        req.append("durationTime", values.durationTime);
        req.append("imageFile", values.imageFile);
        req.append("languageCulture", LangugaeService.getCookies());
        dispatch(updateTraining({ req, id }));
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
        src={`${IMAGE_URL}${training.image && training.image.filePath}`}
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
          defaultValue={training.title}
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
          defaultValue={training.subTitle}
        />
        <label className="createadvocates__forms__label" htmlFor="body">
          Məlumat
        </label>
        <CKEditor
          editor={ClassicEditor}
          onChange={handleOnChange}
          data={training.information}
        />
        <label className="createadvocates__forms__label" htmlFor="durationTime">
          Müddəti
        </label>
        <input
          className="createadvocates__forms__input"
          id="durationTime"
          name="durationTime"
          type="text"
          onChange={formik.handleChange}
          defaultValue={training.durationTime}
        />
        <button className="createadvocates__forms__button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditTrainings;
