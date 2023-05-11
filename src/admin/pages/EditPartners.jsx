import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSinglePartner,
  getSinglePartner,
  updatePartner,
} from "../../features/partnersSlice";
import { IMAGE_URL } from "../../constants";

const EditPartners = () => {
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();
  const partner = useSelector(getSinglePartner);

  useEffect(() => {
    dispatch(fetchSinglePartner({ id }));
  }, [dispatch, id]);

  const formik = useFormik({
    initialValues: {
      urlLink: partner.urlLink,
      imageFile: partner.image,
    },
    onSubmit: async (values) => {
      try {
        var req = new FormData();
        req.append("imageFile", values.imageFile);
        req.append("urlLink", values.urlLink);
        dispatch(updatePartner({ req, id }));
      } catch (error) {
        toast.error(error.response.data.Detail);
      }
    },
  });
  return (
    <div className="createadvocates">
      <Helmet>
        <title>update blog</title>
      </Helmet>
      <img
        style={{
          width: "150px",
        }}
        src={`${IMAGE_URL}${partner.image && partner?.image?.filePath}`}
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
            formik.setFieldValue("image", e.currentTarget.files[0]);
          }}
        />

        <label className="createadvocates__forms__label" htmlFor="urlLink">
          Link
        </label>
        <input
          className="createadvocates__forms__input"
          id="urlLink"
          name="urlLink"
          type="text"
          onChange={formik.handleChange}
          defaultValue={partner.urlLink}
        />
        <button className="createadvocates__forms__button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditPartners;
