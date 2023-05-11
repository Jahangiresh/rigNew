import React from "react";
import { BsChatLeftText } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { BASE_URL } from "../constants";

const Message = () => {
  const [dropdown, setDropdown] = useState(false);
  const { t, i18n } = useTranslation();

  const [whatsappNumber, setWhatsappNumber] = useState([]);
  const fetchSettingsData = async (key) => {
    const response = await axios.get(
      `${BASE_URL}/settings?key=${key}&pageSize=1000`
    );
    return response.data;
  };
  useEffect(() => {
    const getSettingsData = async () => {
      const whatsappNumberData = await fetchSettingsData("whatsappNumber");
      setWhatsappNumber(whatsappNumberData);
    };
    getSettingsData();
  }, []);

  window.addEventListener("click", () => {
    setDropdown(false);
  });

  return <h1>sa</h1>;
};

export default Message;
