import React from "react";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "../scss/dash.scss";
import { useNavigate } from "react-router-dom";
import { ADMIN } from "../../constants";

const content = [
  {
    title: "Akkreditasiyalar səhifəsinin dinamik datalarının idarə edilməsi",
    description: "göstərilən xidmətlərə düzəliş et",
    button: "Akkreditasiya əlavə et",
    image: "https://i.imgur.com/ZXBtVw7.jpg",
    user: "Isa Sadiqli",
    link: `${ADMIN}/accreditations`,
    userProfile:
      "https://media.licdn.com/dms/image/C4E03AQFef5P1032HFA/profile-displayphoto-shrink_800_800/0/1663069599594?e=2147483647&v=beta&t=8Q6VqQBjlojHUc8xgmz0HCTVPPj29p2pVJJMV3vH6bI",
  },
  {
    title: "Xəbərlər səhifəsinin dinamik datalarının idarə edilməsi",
    description: "göstərilən xidmətlərə düzəliş et",

    button: "Xəbər əlavə et",
    image:
      "https://images.unsplash.com/photo-1593115057322-e94b77572f20?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    link: `${ADMIN}/blogs`,
    user: "Erich Behrens",
    userProfile: "https://i.imgur.com/0Clfnu7.png",
  },
  {
    title: "Sertifikatlar səhifəsinin dinamik datalarının idarə edilməsi",

    description: "göstərilən xidmətlərə düzəliş et",

    link: `${ADMIN}/certificates`,
    button: "Sertifikat yaz",
    image: "https://i.imgur.com/DvmN8Hx.jpg",
    user: "Bruno Vizovskyy",
    userProfile: "https://i.imgur.com/4KeKvtH.png",
  },
  {
    title: "Əlaqə məlumatlarının dinamik datalarının idarə edilməsi",

    description: "göstərilən xidmətlərə düzəliş et",

    link: `${ADMIN}/setting`,
    button: "Düzəlişlər et",
    image: "https://i.imgur.com/ZXBtVw7.jpg",
    user: "Luan Gjokaj",
    userProfile: "https://i.imgur.com/JSW6mEk.png",
  },
  {
    title: "Sliderin şəkillərinin idarə edilməsi",
    description: "göstərilən xidmətlərə düzəliş et",

    link: `${ADMIN}/slides`,
    button: "Şəkil əlavə et",
    image: "https://i.imgur.com/DCdBXcq.jpg",
    user: "Erich Behrens",
    userProfile: "https://i.imgur.com/0Clfnu7.png",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="dashboard">
      <Slider className="slider-wrapper" autoplay={2000}>
        {content &&
          content.map((item, index) => (
            <div
              key={index}
              className="slider-content"
              style={{
                background: `url('${item.image}') no-repeat center center`,
              }}
            >
              <div className="inner">
                <h1>{item.title}</h1>
                <p>{item.description}</p>
                <button
                  onClick={() => navigate(item.link)}
                  className="dash__button"
                >
                  {item.button}
                </button>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
};
export default Dashboard;
