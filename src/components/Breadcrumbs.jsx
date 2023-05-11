import React from "react";
import { Link } from "react-router-dom";
import img from "../assets/images/coverbreadcrumbs.svg";
import linesvg from "../assets/images/linesvg.svg";
const Breadcrumbs = ({ title }) => {
  return (
    <div className="h-[400px] relative w-full flex  items-center ">
      <img
        className="w-full h-full absolute top-0 left-0 -z-10 object-cover object-left "
        src={img}
        alt="img"
      />
      <div className="content ml-[120px] max-sm:ml-10">
        <h1 className=" font-bold text-white text-[60px]">{title}</h1>
        <p className="text-white flex gap-x-3">
          <Link to="/" className="underline">
            Home
          </Link>{" "}
          <img src={linesvg} alt="" /> {title}
        </p>
      </div>
    </div>
  );
};

export default Breadcrumbs;
