import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "../admin/assets/libs/boxicons-2.1.1/css/boxicons.min.css";
import "../admin/scss/App.scss";
import Dashboard from "../admin/pages/Dashboard";
import MainLayout from "../admin/layout/MainLayout";
import Login from "../admin/pages/Login";
import Settings from "../admin/pages/Settings";
import AuthService from "../admin/services/AuthService";
import Blogs from "../admin/pages/Blogs";
import CreateBlog from "../admin/pages/CreateBlog";
import EditBlog from "../admin/pages/EditBlog";
import Slides from "../admin/pages/Slides";
import CreateSlide from "../admin/pages/CreateSlide";
import EditSlide from "../admin/pages/EditSlide";
import CreateSetting from "../admin/pages/CreateSetting";
import SettingDetails from "../admin/pages/SettingDetails";
import { ADMIN } from "../constants";
import Accreditations from "../admin/pages/Accreditations";
import EditAccreditations from "../admin/pages/EditAccreditations";
import CreateAccreditations from "../admin/pages/CreateAccreditations";
import Messages from "../admin/pages/Messages";
import MessagesDetail from "../admin/pages/MessagesDetail";
import Partners from "../admin/pages/Partners";
import EditPartners from "../admin/pages/EditPartners";
import CreatePartners from "../admin/pages/CreatePartners";
import CustomerComments from "../admin/pages/CustomerComments";
import EditCustomerComments from "../admin/pages/EditCustomerComments";
import CreateCustomerComments from "../admin/pages/CreateCustomerComments";
import Trainings from "../admin/pages/Trainings";
import EditTrainings from "../admin/pages/EditTrainings";
import CreateTrainings from "../admin/pages/CreateTrainings";
import TrainingsCategory from "../admin/pages/TrainingsCategory";
import CreateTrainingsCategory from "../admin/pages/CreateTrainingsCategory";
import EditTrainingsCategory from "../admin/pages/EditTrainingsCategory";
import EngineerServices from "../admin/pages/EngineerServices";
import EditEngineerServicesCategory from "../admin/pages/EditEngineerServicesCategory";
import EngineerServicesCategory from "../admin/pages/EngineerServicesCategory";
import CreateEngineerServicesCategory from "../admin/pages/CreateEngineerServicesCategory";
import EditEngineerServices from "../admin/pages/EditEngineerServices";
import CreateEngineerServices from "../admin/pages/CreateEngineerServices";
import Certificates from "../admin/pages/Certificates";
import EditCertificates from "../admin/pages/EditCertificates";
import CreateCertificates from "../admin/pages/CreateCertificates";
import EditEquipments from "../admin/pages/EditEquipments";
import CreateEquipments from "../admin/pages/CreateEquipments";
import Equipments from "../admin/pages/Equipments";
import EditEquipmentsCategory from "../admin/pages/EditEquipmentsCategory";
import CreateEquipmentsCategory from "../admin/pages/CreateEquipmentsCategory";
import EquipmentsCategory from "../admin/pages/EquipmentsCategory";
import EducationEvents from "../admin/pages/EducationEvents";
import EditEducationEvents from "../admin/pages/EditEducationEvents";
import CreateEducationEvents from "../admin/pages/CreateEducationEvents";

const AdminLayout = () => {
  let user = localStorage.getItem("user");

  return (
    <div className="admin-wrapper">
      <Router>
        <Routes>
          {user ? (
            <Route path={ADMIN} element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path={`${ADMIN}/blogs`} element={<Blogs />} />
              <Route path={`${ADMIN}/blogs/:id`} element={<EditBlog />} />
              <Route path={`${ADMIN}/blogs/create`} element={<CreateBlog />} />
              <Route
                path={`${ADMIN}/educationevents`}
                element={<EducationEvents />}
              />
              <Route
                path={`${ADMIN}/educationevents/:id`}
                element={<EditEducationEvents />}
              />
              <Route
                path={`${ADMIN}/educationevents/create`}
                element={<CreateEducationEvents />}
              />
              <Route
                path={`${ADMIN}/certificates`}
                element={<Certificates />}
              />
              <Route
                path={`${ADMIN}/certificates/:id`}
                element={<EditCertificates />}
              />
              <Route
                path={`${ADMIN}/certificates/create`}
                element={<CreateCertificates />}
              />

              <Route path={`${ADMIN}/trainings`} element={<Trainings />} />
              <Route
                path={`${ADMIN}/trainingscategory`}
                element={<EditTrainingsCategory />}
              />
              <Route
                path={`${ADMIN}/trainingscategory/:id`}
                element={<TrainingsCategory />}
              />
              <Route
                path={`${ADMIN}/trainingscategory/:id/create`}
                element={<CreateTrainingsCategory />}
              />
              <Route
                path={`${ADMIN}/trainings/:id`}
                element={<EditTrainings />}
              />
              <Route
                path={`${ADMIN}/trainings/create`}
                element={<CreateTrainings />}
              />
              <Route
                path={`${ADMIN}/engineerservices`}
                element={<EngineerServices />}
              />
              <Route
                path={`${ADMIN}/engineerservices/:id`}
                element={<EditEngineerServices />}
              />
              <Route
                path={`${ADMIN}/engineerservices/create`}
                element={<CreateEngineerServices />}
              />
              <Route
                path={`${ADMIN}/engineerservicescategory/:id`}
                element={<EditEngineerServicesCategory />}
              />
              <Route
                path={`${ADMIN}/engineerservicescategory`}
                element={<EngineerServicesCategory />}
              />
              <Route
                path={`${ADMIN}/engineerservicescategory/create`}
                element={<CreateEngineerServicesCategory />}
              />
              <Route path={`${ADMIN}/equipments`} element={<Equipments />} />
              <Route
                path={`${ADMIN}/equipments/:id`}
                element={<EditEquipments />}
              />
              <Route
                path={`${ADMIN}/equipments/create`}
                element={<CreateEquipments />}
              />
              <Route
                path={`${ADMIN}/equipmentscategory/:id`}
                element={<EditEquipmentsCategory />}
              />
              <Route
                path={`${ADMIN}/equipmentscategory`}
                element={<EquipmentsCategory />}
              />
              <Route
                path={`${ADMIN}/equipmentscategory/create`}
                element={<CreateEquipmentsCategory />}
              />
              <Route
                path={`${ADMIN}/customercomments`}
                element={<CustomerComments />}
              />
              <Route
                path={`${ADMIN}/customercomments/:id`}
                element={<EditCustomerComments />}
              />
              <Route
                path={`${ADMIN}/customercomments/create`}
                element={<CreateCustomerComments />}
              />
              <Route
                path={`${ADMIN}/accreditations`}
                element={<Accreditations />}
              />
              <Route
                path={`${ADMIN}/accreditations/:id`}
                element={<EditAccreditations />}
              />
              <Route
                path={`${ADMIN}/accreditations/create`}
                element={<CreateAccreditations />}
              />
              <Route path={`${ADMIN}/partners`} element={<Partners />} />
              <Route
                path={`${ADMIN}/partners/:id`}
                element={<EditPartners />}
              />
              <Route
                path={`${ADMIN}/partners/create`}
                element={<CreatePartners />}
              />
              <Route path={`${ADMIN}/messages`} element={<Messages />} />
              <Route
                path={`${ADMIN}/messages/:id`}
                element={<MessagesDetail />}
              />
              <Route path={`${ADMIN}/setting`} element={<Settings />} />
              <Route
                path={`${ADMIN}/setting/:id`}
                element={<SettingDetails />}
              />
              <Route
                path={`${ADMIN}/setting/create`}
                element={<CreateSetting />}
              />
              <Route path={`${ADMIN}/slides`} element={<Slides />} />
              <Route
                path={`${ADMIN}/slides/create`}
                element={<CreateSlide />}
              />
              <Route path={`${ADMIN}/slides/:id`} element={<EditSlide />} />
            </Route>
          ) : (
            <Route path={`${ADMIN}`} element={<Login />} />
          )}
        </Routes>
      </Router>
    </div>
  );
};

export default AdminLayout;
