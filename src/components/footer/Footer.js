import { Link } from "react-router-dom";
import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import { BiChevronRight } from "react-icons/bi";
import BacktoTop from "./BacktoTop";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAccreditations,
  getAll,
  getStatus,
} from "../../features/accreditationsSlice";
import { useEffect } from "react";
import LoadingBox from "../LoadingBox";
import { BsThreeDots, BsXLg } from "react-icons/bs";
import { BASE_URL, IMAGE_URL } from "../../constants";
import axios from "axios";

const Footer = () => {
  const { t, i18n } = useTranslation();

  const [length, setLength] = useState(false);
  const dispatch = useDispatch();
  const accreditations = useSelector(getAll);
  const status = useSelector(getStatus);

  const [logoWhite, setLogoWhite] = useState([]);
  const [facebookUrl, setFacebookUrl] = useState([]);
  const [linkedinUrl, setLinkedinUrl] = useState([]);
  const [youtubeUrl, setYoutubeUrl] = useState([]);
  const [instagramUrl, setInstagramUrl] = useState([]);
  const [addres, setAddres] = useState([]);
  const [addresLink, setAddresLink] = useState([]);
  const [email, setEmail] = useState([]);
  const [tel, setTel] = useState([]);
  const [catalog, setCatlog] = useState([]);
  const fetchSettingsData = async (key) => {
    const response = await axios.get(
      `${BASE_URL}/settings?key=${key}&pageSize=1000`
    );
    return response.data;
  };
  useEffect(() => {
    const getSettingsData = async () => {
      const logoW = await fetchSettingsData("logo-white");
      const facebook = await fetchSettingsData("facebookUrl");
      const linkedin = await fetchSettingsData("linkedinUrl");
      const youtube = await fetchSettingsData("youtubeUrl");
      const instagram = await fetchSettingsData("instagramUrl");
      const addresData = await fetchSettingsData("addres");
      const addresLinkData = await fetchSettingsData("addresLink");
      const emailData = await fetchSettingsData("email");
      const telData = await fetchSettingsData("tel");
      const catalogData = await fetchSettingsData("catalog");
      setLogoWhite(logoW);
      setFacebookUrl(facebook);
      setLinkedinUrl(linkedin);
      setYoutubeUrl(youtube);
      setInstagramUrl(instagram);
      setAddres(addresData);
      setAddresLink(addresLinkData);
      setEmail(emailData);
      setTel(telData);
      setCatlog(catalogData);
    };
    getSettingsData();
  }, []);

  useEffect(() => {
    dispatch(fetchAccreditations());
  }, [dispatch]);
  if (status === "loading") return <LoadingBox />;

  return (
    <div className="bg__blue py-14">
      <div className="container">
        <div className=" flex justify-between gap-x-20 max-md:flex-col max-md:gap-y-10">
          <div className="basis-6/12">
            <h2 className="font-bold text-xl text-white">Mission</h2>
            <p className="text-justify text-white mt-3 leading-8 font-normal">
              Lorem ipsum dolor sit amet consectetur. Amet donec leo sit erat.
              Eleifend risus diam cursus dictum est Lorem ipsum dolor sit amet
              consectetur. Amet donec leo sit erat. Eleifend
            </p>
          </div>
          <div className="basis-3/12 md:pl-10">
            <h2 className="font-bold text-xl text-white">Menu</h2>
            <ul className="text-white flex flex-col mt-3 leading-8">
              <Link
                className="flex items-center relative  h-full group "
                to="/"
              >
                Home
              </Link>
              <Link
                className="flex items-center relative  h-full group "
                to="/about"
              >
                About us
              </Link>
              <Link
                className="flex items-center relative  h-full group "
                to="/services"
              >
                Services
              </Link>
              <Link
                className="flex items-center relative  h-full group "
                to="/products"
              >
                Products
              </Link>
              <Link
                className="flex items-center relative  h-full group "
                to="/contact"
              >
                Contact us
              </Link>
            </ul>
          </div>
          <div className="basis-3/12">
            <h2 className="font-bold text-xl text-white">Contact Us</h2>
            <ul>
              <li>
                <p className="text-justify text-white mt-3 leading-7">
                  Adress: Lorem ipsum dolor sit amet consectetur. Amet donec leo
                  sit erat.
                </p>
              </li>
              <li className="text-white">Tel: +994 50 500 50 50</li>
              <li className="text-white">Tel: +994 50 500 50 50</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
