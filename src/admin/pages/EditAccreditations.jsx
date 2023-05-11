import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { toast, Toaster } from "react-hot-toast";
import { IMAGE_URL } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleAccreditation,
  getSingleAccreditation,
  getSingleStatus,
  updateAccreditation,
} from "../../features/accreditationsSlice";
import LoadingBox from "../../components/LoadingBox";
import LangugaeService from "../services/LangugaeService";

const EditAccreditations = () => {
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();
  const accreditation = useSelector(getSingleAccreditation);
  const status = useSelector(getSingleStatus);

  useEffect(() => {
    dispatch(fetchSingleAccreditation({ id }));
  }, [dispatch, id]);

  const formik = useFormik({
    initialValues: {
      description: "",
      imageFile: "",
    },
    onSubmit: async (values) => {
      try {
        var req = new FormData();
        req.append("imageFile", values.imageFile);
        req.append("description", values.description);
        req.append("languageCulture", LangugaeService.getCookies());
        dispatch(updateAccreditation({ req, id }));
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
        <title>update accreditation</title>
      </Helmet>
      <img
        style={{
          width: "150px",
        }}
        src={`${IMAGE_URL}${
          accreditation.image && accreditation.image.filePath
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

        <label className="createadvocates__forms__label" htmlFor="description">
          Adı
        </label>
        <input
          className="createadvocates__forms__input"
          id="description"
          name="description"
          type="text"
          onChange={formik.handleChange}
          defaultValue={accreditation.description}
        />
        <button className="createadvocates__forms__button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditAccreditations;
