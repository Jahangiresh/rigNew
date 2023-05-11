import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../../components/LoadingBox";
import {
  fetchSingleEducationEvents,
  getSingleEducationEvents,
  getSingleStatus,
  updateEducationEvents,
} from "../../features/educationEventsSlice";
import { fetchTrainings, getAllTrainings } from "../../features/trainingsSlice";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import LangugaeService from "../services/LangugaeService";

const EditEducationEvents = () => {
  const [startDate, setStartDate] = useState("");
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();
  const educationEvent = useSelector(getSingleEducationEvents);
  const trainings = useSelector(getAllTrainings);
  const status = useSelector(getSingleStatus);
  const onChangeStartDate = (date) => {
    setStartDate(date);
  };
  useEffect(() => {
    dispatch(fetchSingleEducationEvents({ id }));
    dispatch(fetchTrainings({ search: "", pageSize: 50 }));
  }, [dispatch, id]);

  const formik = useFormik({
    initialValues: {
      educationId: educationEvent?.education?.id,
    },
    onSubmit: async (values) => {
      try {
        dispatch(
          updateEducationEvents({
            req: {
              startDate: startDate
                ? startDate.toISOString()
                : educationEvent.startDate,
              educationId: values.educationId,
              languageCulture: LangugaeService.getCookies(),
            },
            id,
          })
        );
      } catch (error) {
        toast.error(error.response.data.Detail);
      }
    },
  });

  if (status === "loading") return <LoadingBox />;

  return (
    <div className="createadvocates">
      <Helmet>
        <title>update education events</title>
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
        <Calendar
          onChange={onChangeStartDate}
          value={educationEvent.startDate}
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
        </select>{" "}
        <button className="createadvocates__forms__button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditEducationEvents;
