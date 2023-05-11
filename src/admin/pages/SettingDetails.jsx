import React, { useReducer, useEffect } from "react";
import { useState } from "react";
import "../scss/productdetails.scss";
import { BsPencil } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { Swal } from "sweetalert2/dist/sweetalert2";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleSettings,
  getSingleSettings,
  getSingleStatus,
  updateSettings,
} from "../../features/settingsSlice";
import LoadingBox from "../../components/LoadingBox";
import { IMAGE_URL } from "../../constants";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const SettingDetails = () => {
  const popUp = (title, icon, text) => {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
  };
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();
  const setting = useSelector(getSingleSettings);
  const status = useSelector(getSingleStatus);
  const [editortxt, setEditotxt] = useState("");
  const handleOnChange = (e, editor) => {
    setEditotxt(editor.getData());
  };
  useEffect(() => {
    dispatch(fetchSingleSettings({ id }));
  }, [dispatch, id]);

  const settingPost = async (setting) => {
    const formData = new FormData();
    formData.append("key", setting.key);
    formData.append("value", setting.value ? setting.value : editortxt);
    formData.append("file", setting.file);
    dispatch(updateSettings({ req: formData, id }));
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

  if (status === "loading") return <LoadingBox />;
  return (
    <div className="productdetails">
      <Helmet>
        <title>setting</title>
      </Helmet>
      {setting.image && (
        <div className="productdetails__images">
          <div className="productdetails__images__image">
            {setting.image && (
              <img
                style={{ width: "200px" }}
                src={`${IMAGE_URL}${setting?.image?.filePath}`}
                alt=""
              />
            )}
          </div>
        </div>
      )}
      <form
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
        style={{
          width: "100%",
        }}
      >
        <label className="custom-file-upload mt-3">
          <input
            name="file"
            type="file"
            accept="file/*"
            onChange={(e) => {
              formik.setFieldValue("file", e.currentTarget.files[0]);
            }}
          />
          {/* <span> Upload image</span> <AiOutlineUpload /> */}
        </label>
        <div className="productdetails__title">
          <h3 className="title__h mt-2">Açar söz:</h3>
          <input
            style={{ width: "90%", padding: "10px" }}
            className="edit_inputs"
            type="text"
            defaultValue={setting.key}
            name="key"
            onChange={formik.handleChange}
          />
        </div>
        {setting.key === "about" ? (
          <div className="productdetails__title">
            <h3 className="title__h mt-2">Dəyər:</h3>
            <CKEditor
              editor={ClassicEditor}
              onChange={handleOnChange}
              data={setting.value}
            />
          </div>
        ) : (
          <div className="productdetails__title">
            <h3 className="title__h mt-2">Dəyər:</h3>
            <input
              style={{ width: "90%", padding: "10px" }}
              className="edit_inputs"
              type="text"
              defaultValue={setting.value && setting.value}
              name="value"
              onChange={formik.handleChange}
            />
          </div>
        )}
        <button
          type="submit"
          className="bg-success btn btn-success text-light  "
        >
          Yadda saxla
        </button>
      </form>
    </div>
  );
};

export default SettingDetails;
