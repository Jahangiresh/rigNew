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
  fetchSingleEquipment,
  getSingleEquipments,
  getSingleStatus,
  updateEquipment,
} from "../../features/equipmentsSlice";
import LangugaeService from "../services/LangugaeService";

const EditEquipments = () => {
  const params = useParams();
  const id = params.id;
  const [editortxt, setEditotxt] = useState("");
  const dispatch = useDispatch();
  const equipment = useSelector(getSingleEquipments);
  const status = useSelector(getSingleStatus);

  useEffect(() => {
    dispatch(fetchSingleEquipment({ id }));
  }, [dispatch, id]);

  const handleOnChange = (e, editor) => {
    setEditotxt(editor.getData());
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      productCode: "",
      mainImageFile: "",
      detailImageFiles: [],
    },
    onSubmit: async (values) => {
      try {
        var req = new FormData();
        req.append("title", values.title);
        req.append("description", editortxt);
        req.append("productCode", values.productCode);
        req.append("mainImageFile", values.mainImageFile);
        values.detailImageFiles.forEach((file, index) => {
          req.append(`detailImageFiles`, file);
        });
        req.append("languageCulture", LangugaeService.getCookies());
        dispatch(updateEquipment({ req, id }));
      } catch (error) {
        toast.error(error.response.data.Detail);
      }
    },
  });

  if (status === "loading") return <LoadingBox />;

  return (
    <div className="createadvocates">
      <Helmet>
        <title>Update Equipment</title>
      </Helmet>
      {equipment.images &&
        equipment?.images.map((image, index) =>
          image.isMain ? (
            <div>
              <p style={{ margin: "0" }}>Əsas şəkil:</p>
              <img
                style={{
                  width: "150px",
                }}
                src={`${IMAGE_URL}${image && image?.filePath}`}
                alt={image.fileName}
              />
              <p style={{ margin: "15px 0 0 0" }}>Digər şəkillər:</p>
            </div>
          ) : (
            <img
              style={{
                width: "150px",
                height: "100px",
                margin: "0 20px 20px 0",
              }}
              src={`${IMAGE_URL}${image && image?.filePath}`}
              alt={image.fileName}
            />
          )
        )}
      <div>
        <Toaster />
      </div>
      <form className="createadvocates__forms" onSubmit={formik.handleSubmit}>
        <label
          className="createadvocates__forms__label"
          htmlFor="mainImageFile"
        >
          əsas şəkil
        </label>
        <input
          className="createadvocates__forms__input"
          id="mainImageFile"
          name="mainImageFile"
          accept="image/*"
          type="file"
          onChange={(e) => {
            formik.setFieldValue("mainImageFile", e.currentTarget.files[0]);
          }}
        />
        <label
          className="createadvocates__forms__label"
          htmlFor="detailImageFiles"
        >
          digər şəkillər
        </label>
        <input
          className="createadvocates__forms__input"
          id="detailImageFiles"
          name="detailImageFiles"
          multiple="multiple"
          accept="image/*"
          type="file"
          onChange={(e) => {
            formik.setFieldValue(
              "detailImageFiles",
              Array.from(e.target.files)
            );
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
          defaultValue={equipment.title}
        />
        <label className="createadvocates__forms__label" htmlFor="productCode">
          Kod
        </label>
        <input
          className="createadvocates__forms__input"
          id="productCode"
          name="productCode"
          type="text"
          onChange={formik.handleChange}
          defaultValue={equipment.productCode}
        />
        <label className="createadvocates__forms__label" htmlFor="description">
          Təsviri
        </label>
        <CKEditor
          editor={ClassicEditor}
          onChange={handleOnChange}
          data={equipment.description}
        />
        <button className="createadvocates__forms__button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditEquipments;
