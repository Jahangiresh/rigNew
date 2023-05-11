import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactUs from "../components/ContactUs";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Message from "../components/Message";
import Shape from "../components/Shape";
import About from "../pages/About";
import Accreditations from "../pages/Accreditations";
import Blogs from "../pages/Blogs";
import BlogsDetail from "../pages/BlogsDetail";
import CheckCertificat from "../pages/CheckCertificat";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import { Trainings } from "../pages/Trainings";
import TrainingsDetail from "../pages/TrainingsDetail";
import TrainingsCategory from "../pages/TrainingsCategory";
import Equipments from "../pages/Equipments";
import EquipmentsDetail from "../pages/EquipmentsDetail";
import EngineerServicesCategory from "../pages/EngineerServicesCategory";
import EngineerServicesDetail from "../pages/EngineerServicesDetail";
import { EngineerServices } from "../pages/EngineerServices";
import { EducationEvents } from "../pages/EducationEvents";
import HeaderDown from "../components/header/HeaderDown";
import Services from "../pages/Services";
import Products from "../pages/Product/Products";
import ProductsList from "../pages/Product/ProductsList";
import ProductDetails from "../pages/Product/ProductDetails";

const Layout = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  // useEffect(() => {
  //   function handleScroll() {
  //     setScrollPosition(window.pageYOffset);
  //   }
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  const { pathname } = window.location;

  return (
    <Router>
      <HeaderDown />
      <Header sticky={scrollPosition > 50} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:category" element={<ProductsList />} />
        <Route path="/products/:category/:id" element={<ProductDetails />} />
        <Route path="/trainings" element={<Trainings />} />
        <Route path="/trainingscategory/:id" element={<TrainingsCategory />} />
        <Route path="/trainings/:id" element={<TrainingsDetail />} />
        <Route path="/educationevents" element={<EducationEvents />} />
        <Route path="/engineerservices" element={<EngineerServices />} />
        <Route
          path="/engineerservicescategory"
          element={<EngineerServicesCategory />}
        />
        <Route
          path="/engineerservices/:id"
          element={<EngineerServicesDetail />}
        />
        <Route path="blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogsDetail />} />
        <Route path="/equipments" element={<Equipments />} />
        <Route path="/equipments/:id" element={<EquipmentsDetail />} />
        <Route path="/accreditations" element={<Accreditations />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkcertificat" element={<CheckCertificat />} />
      </Routes>
      <Message />
      {/* {pathname.includes("/contact") ? "" : <ContactUs />}
      {pathname.includes("/contact") ? "" : <Shape bgColor="currentColor" />} */}
      <Footer />
    </Router>
  );
};

export default Layout;
