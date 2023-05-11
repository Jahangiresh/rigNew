import { useFormik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import "../scss/productdetails.scss";
import { createSettings } from "../../features/settingsSlice";
import { Toaster } from "react-hot-toast";
import LangugaeService from "../services/LangugaeService";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CreateSetting = () => {
  const dispatch = useDispatch();
  const [editortxt, setEditotxt] = useState("");
  const handleOnChange = (e, editor) => {
    setEditotxt(editor.getData());
  };
  const settingPost = async (setting) => {
    const formData = new FormData();
    formData.append("key", setting.key);
    formData.append("value", setting.value ? setting.value : editortxt);
    formData.append("file", setting.file);
    formData.append(
      "languageCulture",
      LangugaeService.getCookies() ? LangugaeService.getCookies() : "az-Latn"
    );
    dispatch(createSettings(formData));
  };
  const formik = useFormik({
    initialValues: {
      key: "",
      value: "",
      file: "",
    },
    onSubmit: (values) => {
      settingPost(values);
    },
  });
  return (
    <div className="productdetails">
      <Toaster />
      <Helmet>
        <title>add setting</title>
      </Helmet>
      <form
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
        style={{
          width: "100%",
        }}
      >
        <label className="custom-file-upload">
          <input
            name="file"
            type="file"
            accept="file/*"
            onChange={(e) => {
              formik.setFieldValue("file", e.currentTarget.files[0]);
            }}
          />
        </label>
        <div
          className="productdetails__title"
          style={{
            height: "50px",
          }}
        >
          <h3 className="title__h">Açar söz:</h3>
          <input
            name="key"
            style={{ marginLeft: "20px" }}
            className="edit_inputs "
            type="text"
            onChange={formik.handleChange}
          />
        </div>
        <div
          className="productdetails__title"
          style={{
            height: "50px",
          }}
        >
          <h3 className="title__h">Value:</h3>
          <input
            name="value"
            style={{ marginLeft: "20px" }}
            className="edit_inputs "
            type="text"
            onChange={formik.handleChange}
          />
        </div>
        <div
          className="productdetails__title"
          style={{
            height: "50px",
          }}
        >
          <h3 className="title__h">Value:</h3>
          <CKEditor editor={ClassicEditor} onChange={handleOnChange} />
          {/* <input
            name="value"
            style={{ marginLeft: "20px" }}
            className="edit_inputs "
            type="text"
            onChange={formik.handleChange}
          /> */}
        </div>
        <button type="submit" className="bg-success  text-light  ">
          Yarat
        </button>
      </form>
    </div>
  );
};

export default CreateSetting;
