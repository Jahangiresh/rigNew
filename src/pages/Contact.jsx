import React from "react";
import { Link } from "react-router-dom";
import HeaderDown from "../components/header/HeaderDown";
import Shape from "../components/Shape";
import { ImPhone } from "react-icons/im";
import { MdLocationOn } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { Formik } from "formik";
import axios from "axios";
import { BASE_URL } from "../constants";
import { toast, Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import ContactComponent from "../components/ContactComponent";
import LogoClouds from "../components/LogoClouds";

const Contact = () => {
  const { t, i18n } = useTranslation();

  const [tel, setTel] = useState([]);
  const [addres, setAddres] = useState([]);
  const [email, setEmail] = useState([]);
  const fetchSettingsData = async (key) => {
    const response = await axios.get(
      `${BASE_URL}/settings?key=${key}&pageSize=1000`
    );
    return response.data;
  };
  useEffect(() => {
    const getSettingsData = async () => {
      const telData = await fetchSettingsData("tel");
      const addresData = await fetchSettingsData("addres");
      const emailData = await fetchSettingsData("email");
      setTel(telData);
      setAddres(addresData);
      setEmail(emailData);
    };
    getSettingsData();
  }, []);

  const contactFormsPost = async (values) => {
    await axios
      .post(`${BASE_URL}/contactusforms`, values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        toast.success("Mesaj göndərildi");
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 429) {
            toast.error(
              t(
                "həddindən artıq sorğu. Saatda maksimum 3 sorğu göndərə bilərsiniz"
              )
            );
          } else if (error.response.status === 400) {
            toast.error(t("zəhmət olmasa dataları düzgün daxil edin"));
          } else {
            alert("An error occurred while sending the request: ", error);
          }
        }
      });
  };

  return (
    <>
      <Breadcrumbs title={"Contact"} />
      <div className="container !my-12">
        <div className="grid lg:grid-cols-3  grid-cols-1">
          <div className="flex w-full lg:flex-col gap-y-4 justify-center max-lg:mb-10 max-lg:gap-x-2 max-sm:flex-col">
            <div className="border border-[#e3e3e3] shadow-lg px-10 py-5 lg:mr-10 ">
              <h3 className="font-bold text__black text-xl mb-5">
                Phone number:
              </h3>
              <p>+994 50 500 50 50</p>
            </div>{" "}
            <div className="border border-[#e3e3e3] shadow-lg px-10 py-5 lg:mr-10">
              <h3 className="font-bold text__black text-xl mb-5">
                Email adress::
              </h3>
              <p>exampla@dd.com</p>
            </div>{" "}
            <div className="border border-[#e3e3e3] shadow-lg px-10 py-5 lg:mr-10">
              <h3 className="font-bold text__black text-xl mb-5">
                Email adress::
              </h3>
              <p>Azərbaycan, Bakı, Həsən Əliyev küç, 49</p>
            </div>
          </div>
          <div className="sm:col-span-2 max-sm:mb-6 sm:grid grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text__black font-bold mb-2" htmlFor="">
                Full name
              </label>
              <input type="text" className="my__input" />
            </div>{" "}
            <div className="flex flex-col">
              <label className="text__black font-bold mb-2" htmlFor="">
                Full name
              </label>
              <input type="text" className="my__input" />
            </div>{" "}
            <div className="flex flex-col">
              <label className="text__black font-bold mb-2" htmlFor="">
                Full name
              </label>
              <input type="text" className="my__input" />
            </div>{" "}
            <div className="flex flex-col">
              <label className="text__black font-bold mb-2" htmlFor="">
                Full name
              </label>
              <input type="text" className="my__input" />
            </div>
            <div className="col-span-2 flex flex-col ">
              <label className="text__black font-bold mb-2" htmlFor="">
                text
              </label>
              <textarea
                className="resize-none my__input"
                name=""
                id=""
                cols="30"
                rows="10"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="rail w-full flex justify-end mt-3">
          <button className="btn__main !py-3 w-max">Submit</button>
        </div>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194473.52376745004!2d49.690150724057396!3d40.39447551158743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d6bd6211cf9%3A0x343f6b5e7ae56c6b!2sBaku!5e0!3m2!1sen!2saz!4v1683386722153!5m2!1sen!2saz"
        style={{ width: "100%", height: "500px" }}
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
      <ContactComponent />
      <LogoClouds />
    </>
  );
};

export default Contact;
