import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleMessage,
  getSingleMessage,
  getSingleStatus,
} from "../../features/MessagesSlice";
import LoadingBox from "../../components/LoadingBox";
import { Toaster } from "react-hot-toast";

const EditAccreditations = () => {
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();
  const message = useSelector(getSingleMessage);
  const status = useSelector(getSingleStatus);

  useEffect(() => {
    dispatch(fetchSingleMessage({ id }));
  }, [dispatch, id]);

  if (status === "loading") return <LoadingBox />;

  return (
    <div className="createadvocates">
      <Helmet>
        <title>message detail</title>
      </Helmet>
      <div>
        <Toaster />
      </div>

      <div className="createadvocates__forms">
        <label
          className="createadvocates__forms__label"
          style={{ paddingTop: "10px", color: "red" }}
        >
          İstifdəçi Adı:
        </label>
        <div className="createadvocates__forms__input">
          <p>{message && message.name}</p>
        </div>
        <label
          className="createadvocates__forms__label"
          style={{ paddingTop: "10px", color: "red" }}
        >
          İstifadəçi maili:
        </label>
        <div className="createadvocates__forms__input">
          <p>{message && message.email}</p>
        </div>
        <label
          className="createadvocates__forms__label"
          style={{ paddingTop: "10px", color: "red" }}
        >
          Mesaj:
        </label>
        <div className="createadvocates__forms__input">
          <p>{message && message.messageBody}</p>
        </div>
        <div className="createadvocates__forms__input">
          <p style={{ color: "#e87813", fontSize: "16px" }}>
            Tarix:{" "}
            {message.createdAt &&
              message.createdAt
                .slice(0, 16)
                .replace("T", "  Saat:  ")
                .replace("-", "/")
                .replace("-", "/")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditAccreditations;
