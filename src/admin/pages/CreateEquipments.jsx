import React, { useState } from "react";
import { useFormik } from "formik";
import "../scss/adminadvocates.scss";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { toast, Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { createEquipment } from "../../features/equipmentsSlice";
import LangugaeService from "../services/LangugaeService";

const CreateEquipments = () => {
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
      productCode: "",
      mainImageFile: "",
      detailImageFiles: [],
    },

    onSubmit: (values) => {
      try {
        var req = new FormData();
        req.append("title", values.title);
        req.append("description", editortxt);
        req.append("productCode", values.productCode);
        req.append("mainImageFile", values.mainImageFile);
        values.detailImageFiles.forEach((file, index) => {
          req.append(`detailImageFiles`, file);
        });
        req.append("equipmentSubcategoryId", sub);
        req.append(
          "languageCulture",
          LangugaeService.getCookies()
            ? LangugaeService.getCookies()
            : "az-Latn"
        );
        dispatch(createEquipment(req));
      } catch (error) {
        toast.error(error.response.data.Detail);
      }
    },
  });
  return (
    <div className="createadvocates">
      <Helmet>
        <title>Create Equipments</title>
      </Helmet>
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
        <label className="createadvocates__forms__label" htmlFor="productCode">
          Kod
        </label>
        <input
          className="createadvocates__forms__input"
          id="productCode"
          name="productCode"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.productCode}
        />
        <label className="createadvocates__forms__label" htmlFor="description">
          Təsviri
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

export default CreateEquipments;
