import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeaderDown from "../components/header/HeaderDown";
import UserCount from "../components/UserCount";
import texnikibazaImage from "../assets/images/texnikibaza.png";
import sertifikatImage from "../assets/images/sertifikatChoseus.png";
import telimciImage from "../assets/images/telimci.png";
import xidmetImage from "../assets/images/xidmet.png";
import Shape from "../components/Shape";
import { useEffect } from "react";
import { BASE_URL, IMAGE_URL } from "../constants";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import ReactHtmlParser from "react-html-parser";
import axios from "axios";
import Breadcrumbs from "../components/Breadcrumbs";
import ContactComponent from "../components/ContactComponent";
import LogoClouds from "../components/LogoClouds";
const About = () => {
  const { t, i18n } = useTranslation();

  const [about, setAbout] = useState([]);
  const [aboutImage, setAboutImage] = useState([]);
  const fetchSettingsData = async (key) => {
    const response = await axios.get(
      `${BASE_URL}/settings?key=${key}&pageSize=1000`
    );
    return response.data;
  };
  useEffect(() => {
    const getSettingsData = async () => {
      const aboutData = await fetchSettingsData("about");
      const aboutImageData = await fetchSettingsData("aboutImage");
      setAbout(aboutData);
      setAboutImage(aboutImageData);
    };
    getSettingsData();
  }, []);

  return (
    <>
      <Breadcrumbs title={"about"} />
      <div className="container py-12">
        <div className="mb-12">
          <h1 className="text__black font-bold text-[28px] mb-3">Rig Force</h1>
          <p className="leading-8">
            Lorem ipsum dolor sit amet consectetur. Amet donec leo sit erat.
            Eleifend risus diam cursus dictum est Lorem ipsum dolor sit amet
            consectetur. Amet donec leo sit erat. Eleifend risus diam cursus
            dictum est Lorem ipsum dolor sit amet consectetur. Amet donec leo
            sit erat. Eleifend risus diam cursus dictum est Lorem ipsum dolor
            sit amet consectetur. Amet donec leo sit erat. Eleifend risus diam
            cursus dictum estLorem ipsum dolor sit amet consectetur. Amet donec
            leo sit erat. Eleifend risus diam cursus dictum est Lorem ipsum
            dolor sit amet consectetur. Amet donec leo sit erat. Eleifend risus
            diam cursus dictum est Lorem ipsum dolor sit amet consectetur. Amet
            donec leo sit erat. Eleifend risus diam cursus dictum est Lorem
            ipsum dolor sit amet consectetur. Amet donec leo sit erat. Eleifend
            risus diam cursus dictum est Lorem ipsum dolor sit amet consectetur.
            Amet donec leo sit erat. Eleifend risus diam cursus dictum est Lorem
            ipsum dolor sit amet consectetur. Amet donec leo sit erat. Eleifend
            risus diam cursus dictum estLorem ipsum dolor sit amet consectetur.
            Amet donec leo sit erat. Eleifend risus diam cursus dictum est Lorem
            ipsum dolor sit amet consectetur. Amet donec leo sit erat. Eleifend
            risus diam cursus dictum estLorem ipsum dolor sit amet consectetur
          </p>
        </div>
        <div className="mb-12">
          <h1 className="text__black font-bold text-[28px] mb-3">
            Vision & Mission
          </h1>
          <p className="leading-8">
            Lorem ipsum dolor sit amet consectetur. Amet donec leo sit erat.
            Eleifend risus diam cursus dictum est Lorem ipsum dolor sit amet
            consectetur. Amet donec leo sit erat. Eleifend risus diam cursus
            dictum est Lorem ipsum dolor sit amet consectetur. Amet donec leo
            sit erat. Eleifend risus diam cursus dictum est Lorem ipsum dolor
            sit amet consectetur. Amet donec leo sit erat. Eleifend risus diam
            cursus dictum estLorem ipsum dolor sit amet consectetur. Amet donec
            leo sit erat. Eleifend risus diam cursus dictum est Lorem ipsum
            dolor sit amet consectetur. Amet donec leo sit erat. Eleifend risus
            diam cursus dictum est Lorem ipsum dolor sit amet consectetur. Amet
            donec leo sit erat. Eleifend risus diam cursus dictum est Lorem
            ipsum dolor sit amet consectetur. Amet donec leo sit erat. Eleifend
            risus diam cursus dictum est Lorem ipsum dolor sit amet consectetur.
            Amet donec leo sit erat. Eleifend risus diam cursus dictum est Lorem
            ipsum dolor sit amet consectetur. Amet donec leo sit erat. Eleifend
            risus diam cursus dictum estLorem ipsum dolor sit amet consectetur.
            Amet donec leo sit erat. Eleifend risus diam cursus dictum est Lorem
            ipsum dolor sit amet consectetur. Amet donec leo sit erat. Eleifend
            risus diam cursus dictum estLorem ipsum dolor sit amet consectetur
          </p>
        </div>
      </div>
      <ContactComponent />
      <LogoClouds />
    </>
  );
};

export default About;
