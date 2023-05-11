import React from "react";
import { Link } from "react-router-dom";
import HeaderDown from "../components/header/HeaderDown";
import Shape from "../components/Shape";
import { useState } from "react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { BASE_URL, IMAGE_URL } from "../constants";
import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const CheckCertificat = () => {
  const [open, setOpen] = React.useState(false);
  const [certificate, setCertificate] = useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { t, i18n } = useTranslation();
  const finref = useRef();

  const [checkCertificatImage, setCheckCertificatImage] = useState([]);
  const fetchSettingsData = async (key) => {
    const response = await axios.get(
      `${BASE_URL}/settings?key=${key}&pageSize=1000`
    );
    return response.data;
  };
  useEffect(() => {
    const getSettingsData = async () => {
      const checkCertificatImageData = await fetchSettingsData(
        "checkCertificatImage"
      );
      setCheckCertificatImage(checkCertificatImageData);
    };
    getSettingsData();
  }, []);

  const check = async (fin) => {
    await axios
      .get(`${BASE_URL}/certificates/fin/${fin}`)
      .then((res) => {
        setCertificate(res?.data);
        handleOpen();
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: t("bələ bir sertifikat mövcud deyil"),
        });
      });
  };
  return <h1>sa</h1>;
};

export default CheckCertificat;
