import axios from "axios";
import { ADMIN, BASE_URL } from "../../constants";

const sidebarNav = [
  {
    link: ADMIN,
    section: "Home",
    icon: <i className="bx bx-home-alt"></i>,
    text: "Əsas Səhifə",
  },
  {
    link: `${ADMIN}/accreditations`,
    section: "accreditations",
    icon: <i className="bx bx-receipt"></i>,
    text: "Akkreditasiyalar",
  },
  {
    link: `${ADMIN}/blogs`,
    section: "blogs",
    icon: <i className="bx bx-receipt"></i>,
    text: "Bloglar",
  },
  {
    link: `${ADMIN}/engineerservicescategory`,
    section: "engineerservicescategory",
    icon: <i className="bx bx-receipt"></i>,
    text: "Mühəndislik xidmətləri",
  },
  {
    link: `${ADMIN}/equipmentscategory`,
    section: "equipmentscategory",
    icon: <i className="bx bx-receipt"></i>,
    text: "Təchizat",
  },
  {
    link: `${ADMIN}/certificates`,
    section: "certificates",
    icon: <i className="bx bx-receipt"></i>,
    text: "Sertifikatlar",
  },
  {
    link: `${ADMIN}/educationevents`,
    section: "educationevents",
    icon: <i className="bx bx-receipt"></i>,
    text: "Təlim Vaxtları",
  },
  {
    link: `${ADMIN}/slides`,
    section: "slides",
    icon: <i className="bx bx-receipt"></i>,
    text: "Slaydlar",
  },
  {
    link: `${ADMIN}/messages`,
    section: "messages",
    icon: <i className="bx bx-receipt"></i>,
    text: "İsmarıclar",
  },
  {
    link: `${ADMIN}/partners`,
    section: "partners",
    icon: <i className="bx bx-receipt"></i>,
    text: "Tərəfdaşlar",
  },
  {
    link: `${ADMIN}/customercomments`,
    section: "customercomments",
    icon: <i className="bx bx-receipt"></i>,
    text: "Müştəri Rəyləri",
  },
  {
    link: `${ADMIN}/setting`,
    section: "setting",
    icon: <i className="bx bx-cog"></i>,
    text: "Setting",
  },
];

const getCategory = async () => {
  await axios
    .get(`${BASE_URL}/categories`)
    .then((res) => {
      res?.data?.slice(0, 2)?.map((data) =>
        sidebarNav.splice(1, 0, {
          link: `${ADMIN}/trainingscategory/${data.id}`,
          section: "trainings",
          icon: <i className="bx bx-cube"></i>,
          text: data.title,
        })
      );
    })
    .catch((err) => {});
};

getCategory();

export default sidebarNav;
