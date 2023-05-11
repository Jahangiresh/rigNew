import React from "react";
import { Helmet } from "react-helmet";

const NotFound = () => {
  return (
    <div className="notfound__parent">
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <div className="custom-container">
        <ul className="custom-container__list">
          <li className="custom-container__list__item">404</li>
          <li className="custom-container__list__item line">|</li>
          <li className="custom-container__list__item">NOT FOUND</li>
        </ul>
      </div>
    </div>
  );
};

export default NotFound;
