import React, { useState } from "react";
import user from "../assets/images/user.png";
import sertifikat from "../assets/images/sertifikat.png";
import compony from "../assets/images/compony.png";
import isci from "../assets/images/isci.png";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../constants";

const UserCount = ({ bgColor, txtColor }) => {
  const { t, i18n } = useTranslation();

  const [userCount, setUserCount] = useState([]);
  const [certificateCount, setCertificateCount] = useState([]);
  const [componyCount, setComponyCount] = useState([]);
  const [workerCount, setWorkerCount] = useState([]);
  const fetchSettingsData = async (key) => {
    const response = await axios.get(
      `${BASE_URL}/settings?key=${key}&pageSize=1000`
    );
    return response.data;
  };
  useEffect(() => {
    const getSettingsData = async () => {
      const userCountData = await fetchSettingsData("userCount");
      const certificateCountData = await fetchSettingsData("certificateCount");
      const componyCountData = await fetchSettingsData("componyCount");
      const workerCountData = await fetchSettingsData("workerCount");
      setUserCount(userCountData);
      setCertificateCount(certificateCountData);
      setComponyCount(componyCountData);
      setWorkerCount(workerCountData);
    };
    getSettingsData();
  }, []);

  return <h1>SA</h1>;
};

export default UserCount;
