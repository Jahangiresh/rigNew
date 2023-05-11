import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import axios from "axios";
import { BASE_URL } from "./constants";
import { toast } from "react-hot-toast";

i18n
  .use(initReactI18next)
  .use(Backend)
  .use(LanguageDetector)
  .init({
    fallbackLng: "az-Latn",
    // lng: "az-Latn",
  })
  .then(async () => {
    await axios
      .post(`${BASE_URL}/languages/${i18n.language}`, {})
      .then((res) => {
        toast.success("dil dəyişdirildi");
        // window.location.reload(false);
      })
      .catch((err) => {
        toast.error("Belə bir dil mövcud deyil");
      });
  });

export default i18n;
