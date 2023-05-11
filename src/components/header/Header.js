import React, { useEffect, useRef } from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import azFlag from "../../assets/images/Flag_of_Azerbaijan.svg.png";
import enFlag from "../../assets/images/Flag_of_the_United_Kingdom_(3-5).svg.png";
import ruFlag from "../../assets/images/Flag_of_Russia.svg.webp";
import { Link } from "react-router-dom";
import { useState } from "react";
import MenuDrawer from "./MenuDrawer";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { BASE_URL, IMAGE_URL } from "../../constants";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

import logoSvg from "../../assets/images/logo.svg";
import { FiChevronDown } from "react-icons/fi";
const Header = ({ sticky }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState(false);
  const [categories, setCategories] = useState([]);
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const [logoWhite, setLogoWhite] = useState([]);
  const [logoColored, setLogoColored] = useState([]);
  const [facebookUrl, setFacebookUrl] = useState([]);
  const [linkedinUrl, setLinkedinUrl] = useState([]);
  const [youtubeUrl, setYoutubeUrl] = useState([]);
  const [instagramUrl, setInstagramUrl] = useState([]);
  const [tel, setTel] = useState([]);
  // const fetchSettingsData = async (key) => {
  //   const response = await axios.get(
  //     `${BASE_URL}/settings?key=${key}&pageSize=1000`
  //   );

  //   return response.data;
  // };
  // useEffect(() => {
  //   const getSettingsData = async () => {
  //     const logoW = await fetchSettingsData("logo-white");
  //     const logoC = await fetchSettingsData("logo-colored");
  //     const facebook = await fetchSettingsData("facebookUrl");
  //     const linkedin = await fetchSettingsData("linkedinUrl");
  //     const youtube = await fetchSettingsData("youtubeUrl");
  //     const instagram = await fetchSettingsData("instagramUrl");
  //     const telData = await fetchSettingsData("tel");
  //     setLogoWhite(logoW);
  //     setLogoColored(logoC);
  //     setFacebookUrl(facebook);
  //     setLinkedinUrl(linkedin);
  //     setYoutubeUrl(youtube);
  //     setInstagramUrl(instagram);
  //     setTel(telData);
  //   };
  //   getSettingsData();
  // }, []);
  useEffect(() => {
    const getCategory = async () => {
      await axios
        .get(`${BASE_URL}/equipmentcategories`)
        .then((res) => {
          console.log("cat", res);

          setCategories(res.data);
        })
        .catch((err) => {});
    };
    getCategory();
  }, [dispatch]);
  // const getLanguage = async (lang) => {
  //   await axios
  //     .post(`${BASE_URL}/languages/${lang}`, {})
  //     .then((res) => {
  //       toast.success("dil dəyişdirildi");
  //       window.location.reload(false);
  //     })
  //     .catch((err) => {
  //       toast.error("Belə bir dil mövcud deyil");
  //     });
  // };
  // const changeLanguage = (lang) => {
  //   i18n.changeLanguage(lang);
  //   localStorage.setItem("i18nextLng", lang);
  //   getLanguage(lang);
  // };
  return (
    <div className="h-20  flex items-center">
      <div className="container  ">
        <div className="grid grid-cols-2 max-lg:grid-cols-3 w-full">
          <div className="logo ">
            <img className="w-[60px] h-[60px]" src={logoSvg} alt="" />
          </div>
          <dir className="sm:hidden flex items-center w-full col-span-2 justify-end">
            <MenuDrawer />
          </dir>
          <nav className=" flex items-center max-lg:col-span-2 max-sm:hidden">
            <ul className="flex  justify-between w-full capitalize ">
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
                <FiChevronDown className={`ml-2`} />
                <div
                  className={`
                      absolute w-full h-32 bg-red-500 top-[100%] left-0 hidden group-hover:block hover:!block z-20`}
                ></div>
              </Link>
              <Link
                className="flex items-center relative  h-full group "
                to="/products"
              >
                Products
                <FiChevronDown className={`ml-2`} />
                <div
                  className={`
                      absolute w-full h-32 bg-red-500 top-[100%] left-0 hidden group-hover:block hover:!block z-20`}
                ></div>
              </Link>
              <Link
                className="flex items-center relative  h-full group "
                to="/contact"
              >
                Contact us
              </Link>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
