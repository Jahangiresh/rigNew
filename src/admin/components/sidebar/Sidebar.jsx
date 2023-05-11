import React, { useEffect, useState } from "react";
import "./sidebar.scss";
import { Link, useLocation } from "react-router-dom";
import { images } from "../../constants";
import sidebarNav from "../../configs/sidebarNav";
import azFlag from "../../../assets/images/Flag_of_Azerbaijan.svg.png";
import enFlag from "../../../assets/images/Flag_of_the_United_Kingdom_(3-5).svg.png";
import ruFlag from "../../../assets/images/Flag_of_Russia.svg.webp";
import axios from "axios";
import { BASE_URL } from "../../../constants";
import { Toaster, toast } from "react-hot-toast";
import LangugaeService from "../../services/LangugaeService";

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dropdown, setDropdown] = useState(false);
  let language = "az-Latn";
  const location = useLocation();

  useEffect(() => {
    const curPath = window.location.pathname.split("/")[1];
    const activeItem = sidebarNav.findIndex((item) => item.section === curPath);

    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);
  const getLanguage = async (lang) => {
    await axios
      .post(`${BASE_URL}/languages/${lang}`, {})
      .then((res) => {
        toast.success("dil dəyişdirildi");
        language = LangugaeService.getCookies();
        setTimeout(() => {
          window.location.reload(false);
        }, 700);
      })
      .catch((err) => {
        toast.error("Belə bir dil mövcud deyil");
      });
  };

  const closeSidebar = () => {
    document.querySelector(".main__content").style.transform =
      "scale(1) translateX(0)";
    setTimeout(() => {
      document.body.classList.remove("sidebar-open");
      document.querySelector(".main__content").style = "";
    }, 500);
  };
  const logoutHandler = async () => {
    try {
      localStorage.removeItem("user");
      window.location = "/";
    } catch (error) {
      alert("logout later");
    }
  };
  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <Toaster />
        {/* <img src={images.logo} alt="" />
        <div className="sidebar-close" onClick={closeSidebar}>
          <i className="bx bx-x"></i>
        </div> */}
        <div className="headerdown__language">
          <ul className="headerdown__language__list">
            <li className="headerdown__language__list__item">
              <button
                className="headerdown__language__list__item__link"
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdown(!dropdown);
                }}
              >
                <img
                  src={
                    LangugaeService.getCookies() === "az-Latn"
                      ? azFlag
                      : LangugaeService.getCookies() === "en-US"
                      ? enFlag
                      : LangugaeService.getCookies() === "ru"
                      ? ruFlag
                      : enFlag
                  }
                  alt="flag"
                  className="headerdown__language__list__item__link__image"
                />
                <span className="headerdown__language__list__item__link__text">
                  {LangugaeService.getCookies()}
                </span>
              </button>
              <div
                className={` ${dropdown ? "d-block" : "d-none"}
                  style.headerdown__language__list__item__dropdown
                `}
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdown(true);
                }}
              >
                <ul className="headerdown__language__list__item__dropdown__list">
                  <li
                    className="headerdown__language__list__item__dropdown__list__item"
                    onClick={() => getLanguage("az-Latn")}
                  >
                    <a className="headerdown__language__list__item__dropdown__list__item__links">
                      <img
                        className="headerdown__language__list__item__dropdown__list__item__links__image"
                        src={azFlag}
                        alt="Azerbaijan flag"
                      />
                      <span className="headerdown__language__list__item__dropdown__list__item__links__text">
                        az-latn
                      </span>
                    </a>
                  </li>
                  <li
                    className="headerdown__language__list__item__dropdown__list__item"
                    onClick={() => getLanguage("en-US")}
                  >
                    <a className="headerdown__language__list__item__dropdown__list__item__links">
                      <img
                        className="headerdown__language__list__item__dropdown__list__item__links__image"
                        src={enFlag}
                        alt="English flag"
                      />
                      <span className="headerdown__language__list__item__dropdown__list__item__links__text">
                        en-us
                      </span>
                    </a>
                  </li>
                  <li
                    className="headerdown__language__list__item__dropdown__list__item"
                    onClick={() => getLanguage("ru")}
                  >
                    <a className="headerdown__language__list__item__dropdown__list__item__links">
                      <img
                        className="headerdown__language__list__item__dropdown__list__item__links__image"
                        src={ruFlag}
                        alt="Russia flag"
                      />
                      <span className="headerdown__language__list__item__dropdown__list__item__links__text">
                        ru
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="sidebar__menu">
        {sidebarNav &&
          sidebarNav.map((nav, index) => (
            <Link
              to={nav.link}
              key={`nav-${index}`}
              className={`sidebar__menu__item ${
                activeIndex === index && "active"
              }`}
              onClick={closeSidebar}
            >
              <div className="sidebar__menu__item__icon">{nav.icon}</div>
              <div className="sidebar__menu__item__txt">{nav.text}</div>
            </Link>
          ))}

        <div className="sidebar__menu__item">
          <div className="sidebar__menu__item__icon">
            <i className="bx bx-log-out"></i>
          </div>
          <div
            onClick={() => logoutHandler()}
            className="sidebar__menu__item__txt"
          >
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
