import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import "../scss/adminadvocates.scss";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { toast, Toaster } from "react-hot-toast";
import { createCertificate } from "../../features/certificatesSlice";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { fetchTrainings, getAllTrainings } from "../../features/trainingsSlice";
import LangugaeService from "../services/LangugaeService";

const CreateCertificates = () => {
  const [certTestDate, setCertTestDate] = useState(new Date());
  const [certGivenDate, setCertGivenDate] = useState(new Date());
  const [certExpiryDate, setCertExpiryDate] = useState(new Date());
  const dispatch = useDispatch();
  const trainings = useSelector(getAllTrainings);
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
    dispatch(fetchTrainings({ search: "", pageSize: 50 }));
  }, [dispatch]);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      educationId: "",
      certCode: "",
      fIN: "",
      certFile: "",
    },
    onSubmit: (values) => {
      try {
        var req = new FormData();
        req.append("firstName", values.firstName);
        req.append("lastName", values.lastName);
        req.append(
          "educationId",
          values.educationId ? values.educationId : trainings[0]?.id
        );
        req.append("certCode", values.certCode);
        req.append("fIN", values.fIN);
        req.append("certTestDate", certTestDate.toISOString());
        req.append("certGivenDate", certGivenDate.toISOString());
        req.append("certExpiryDate", certExpiryDate.toISOString());
        req.append("certFile", values.certFile);
        req.append("languageCulture", "az-Latn");
        dispatch(createCertificate(req));
      } catch (error) {
        toast.error(error.response.data.Detail);
      }
    },
  });
  return (
    <div className="createadvocates">
      <Helmet>
        <title>create certificat</title>
      </Helmet>
      <div>
        <Toaster />
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
          value={formik.values.firstName}
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
          value={formik.values.lastName}
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
          value={formik.values.certCode}
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
          value={formik.values.fIN}
        />
        <label
          className="createadvocates__forms__label"
          htmlFor="certGivenDate"
        >
          Sertifikatın test vaxtı
        </label>
        <Calendar onChange={onChangeCertTestDate} value={certTestDate} />
        <label
          className="createadvocates__forms__label"
          htmlFor="certGivenDate"
        >
          Sertifikatın verilmə vaxtı
        </label>
        <Calendar onChange={onChangeCertGivenDate} value={certGivenDate} />
        <label
          className="createadvocates__forms__label"
          htmlFor="certGivenDate"
        >
          Sertifikatın bitmə vaxtı
        </label>
        <Calendar onChange={onChangeCertExpiryDate} value={certExpiryDate} />
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

export default CreateCertificates;
