import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { IMAGE_URL } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../../components/LoadingBox";
import {
  fetchSingleCertificate,
  getSingleCertificates,
  getSingleStatus,
  updateCertificate,
} from "../../features/certificatesSlice";
import { fetchTrainings, getAllTrainings } from "../../features/trainingsSlice";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { AiOutlineDownload } from "react-icons/ai";

const EditCertificates = () => {
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();
  const certificate = useSelector(getSingleCertificates);
  const status = useSelector(getSingleStatus);
  const trainings = useSelector(getAllTrainings);
  const [certTestDate, setCertTestDate] = useState("");
  const [certGivenDate, setCertGivenDate] = useState("");
  const [certExpiryDate, setCertExpiryDate] = useState("");
  const onChangeCertTestDate = (date) => {
    setCertTestDate(date);
  };
  const onChangeCertGivenDate = (date) => {
    setCertGivenDate(date);
  };
  const onChangeCertExpiryDate = (date) => {
    setCertExpiryDate(date);
  };
  useEffect(() => {
    dispatch(fetchSingleCertificate({ id }));
    dispatch(fetchTrainings({ search: "", pageSize: 50 }));
  }, [dispatch, id]);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      educationId: "",
      certCode: "",
      fIN: "",
      certFile: "",
    },
    onSubmit: async (values) => {
      try {
        var req = new FormData();
        req.append("firstName", values.firstName);
        req.append("lastName", values.lastName);
        req.append("educationId", values.educationId);
        req.append("certCode", values.certCode);
        req.append("fIN", values.fIN);
        req.append(
          "certTestDate",
          certTestDate ? certTestDate.toISOString() : certificate.certTestDate
        );
        req.append(
          "certGivenDate",
          certGivenDate
            ? certGivenDate.toISOString()
            : certificate.certGivenDate
        );
        req.append(
          "certExpiryDate",
          certExpiryDate
            ? certExpiryDate.toISOString()
            : certificate.certExpiryDate
        );
        req.append("certFile", values.certFile);
        req.append("languageCulture", "az-Latn");
        dispatch(updateCertificate({ req, id }));
      } catch (error) {
        toast.error(error.response.data.Detail);
      }
    },
  });

  if (status === "loading") return <LoadingBox />;
  return (
    <div className="createadvocates">
      <Helmet>
        <title>update certificate</title>
      </Helmet>
      <div>
        <Toaster />
      </div>
      <div>
        <a
          style={{ color: "blue" }}
          target="_blank"
          href={`${IMAGE_URL}${certificate?.certFile?.filePath}`}
        >
          PDF <AiOutlineDownload />
        </a>
      </div>
      <form className="createadvocates__forms" onSubmit={formik.handleSubmit}>
        <label className="createadvocates__forms__label" htmlFor="certFile">
          Sertifikat
        </label>
        <input
          className="createadvocates__forms__input"
          id="certFile"
          name="certFile"
          type="file"
          accept=".pdf"
          onChange={(e) => {
            formik.setFieldValue("certFile", e.currentTarget.files[0]);
          }}
        />
        <label className="createadvocates__forms__label" htmlFor="firstName">
          Ad
        </label>
        <input
          className="createadvocates__forms__input"
          id="firstName"
          name="firstName"
          type="text"
          onChange={formik.handleChange}
          defaultValue={certificate.firstName}
        />
        <label className="createadvocates__forms__label" htmlFor="lastName">
          Soyad
        </label>
        <input
          className="createadvocates__forms__input"
          id="lastName"
          name="lastName"
          type="text"
          onChange={formik.handleChange}
          defaultValue={certificate.lastName}
        />
        <label className="createadvocates__forms__label" htmlFor="certCode">
          Sertifikat kodu
        </label>
        <input
          className="createadvocates__forms__input"
          id="certCode"
          name="certCode"
          type="text"
          onChange={formik.handleChange}
          defaultValue={certificate.certCode}
        />
        <label className="createadvocates__forms__label" htmlFor="fIN">
          Fin
        </label>
        <input
          className="createadvocates__forms__input"
          id="fIN"
          name="fIN"
          type="text"
          onChange={formik.handleChange}
          defaultValue={certificate.fin}
        />
        <label
          className="createadvocates__forms__label"
          htmlFor="certGivenDate"
        >
          Sertifikatın test vaxtı
        </label>
        <Calendar
          onChange={onChangeCertTestDate}
          value={certificate.certTestDate}
        />
        <label
          className="createadvocates__forms__label"
          htmlFor="certGivenDate"
        >
          Sertifikatın verilmə vaxtı
        </label>
        <Calendar
          onChange={onChangeCertGivenDate}
          value={certificate.certGivenDate}
        />
        <label
          className="createadvocates__forms__label"
          htmlFor="certGivenDate"
        >
          Sertifikatın bitmə vaxtı
        </label>
        <Calendar
          onChange={onChangeCertExpiryDate}
          value={certificate.certExpiryDate}
        />
        <label
          className="createadvocates__forms__label"
          htmlFor="languageCulture"
          style={{ paddingTop: "10px" }}
        >
          Təlim
        </label>
        <select
          className="createadvocates__forms__input"
          id="educationId"
          name="educationId"
          onChange={formik.handleChange}
          value={formik.values.educationId}
        >
          {trainings &&
            trainings.map((training, index) => (
              <option key={index} value={training.id}>
                {training.title}
              </option>
            ))}
        </select>
        <button className="createadvocates__forms__button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditCertificates;
