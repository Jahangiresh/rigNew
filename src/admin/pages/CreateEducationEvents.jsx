import React from "react";
import { useFormik } from "formik";
import "../scss/adminadvocates.scss";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { toast, Toaster } from "react-hot-toast";
import { fetchTrainings, getAllTrainings } from "../../features/trainingsSlice";
import { useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { createEducationEvents } from "../../features/educationEventsSlice";
import LangugaeService from "../services/LangugaeService";

const CreateEducationEvents = () => {
  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();
  const trainings = useSelector(getAllTrainings);
  const onChangeStartDate = (date) => {
    setStartDate(date);
  };
  useEffect(() => {
    dispatch(fetchTrainings({ search: "", pageSize: 50 }));
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      educationId: "",
    },

    onSubmit: (values) => {
      try {
        dispatch(
          createEducationEvents({
            startDate: startDate.toISOString(),
            educationId: values.educationId,
            languageCulture: LangugaeService.getCookies(),
          })
        );
      } catch (error) {
        toast.error(error.response.data.Detail);
      }
    },
  });
  return (
    <div className="createadvocates">
      <Helmet>
        <title>create education events</title>
      </Helmet>
      <div>
        <Toaster />
      </div>
      <form className="createadvocates__forms" onSubmit={formik.handleSubmit}>
        <label
          className="createadvocates__forms__label"
          htmlFor="certGivenDate"
        >
          Sertifikatın test vaxtı
        </label>
        <Calendar onChange={onChangeStartDate} value={startDate} />
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
        </select>{" "}
        <button className="createadvocates__forms__button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateEducationEvents;
