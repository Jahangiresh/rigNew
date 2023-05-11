import React from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import prodImg from "../../assets/images/prod.png";
import ImageGallery from "react-image-gallery";
import ContactComponent from "../../components/ContactComponent";
import LogoClouds from "../../components/LogoClouds";

const images = [
  {
    original: prodImg,
    thumbnail: prodImg,
  },
  {
    original: prodImg,
    thumbnail: prodImg,
  },
  {
    original: prodImg,
    thumbnail: prodImg,
  },
  {
    original: prodImg,
    thumbnail: prodImg,
  },
];
const ProductDetails = () => {
  return (
    <>
      <Breadcrumbs title={"Products"} />
      <div className="container py-10">
        <div className="grid lg:grid-cols-3 max-lg:flex max-lg:flex-col max-lg:items-center  ">
          <div className="col-span-1 max-lg:mb-10">
            <ImageGallery items={images} />
          </div>
          <div className="col-span-2 pl-6 ">
            <h1 className="text__black font-bold text-[28px] mb-6 ">
              RGH13 Summit Harness
            </h1>
            <ul className="leading-8">
              <li>
                <span className="text__black font-medium">Product code: </span>
                <span>RGH32</span>
              </li>{" "}
              <li>
                <span className="text__black font-medium">Accredited To: </span>
                <span>EN 12277:2015 Type A & B</span>
              </li>{" "}
              <li>
                <span className="text__black font-medium">Weight: </span>
                <span>Size 0: 900g, size 1: 950g, size 2: 1kg</span>
              </li>{" "}
              <li>
                <span className="text__black font-medium">Size: </span>
                <span>900g, size 1: 950g, size 2: 1kg</span>
              </li>{" "}
              <li>
                <span className="text__black font-medium">Material: </span>
                <span>45mm RIDGE Protect anti-bacterial polyester*</span>
              </li>{" "}
              <li>
                <span className="text__black font-medium">Fittings: </span>
                <span>4D rings: aluminium, adjusters: steel</span>
              </li>{" "}
              <li>
                <span className="text__black font-medium">
                  Product Features:{" "}
                </span>
                <span>
                  Ventral & back attachment points • Colour-coded webbing •
                  Step-in design • Elastic webbing retainers • Bigger webbing
                  turnbacks
                </span>
              </li>{" "}
            </ul>
            <ul className="flex flex-col mt-2 gap-y-4">
              <li>
                <button className="btn__secondary">Download PDF</button>
              </li>
              <li>
                <button className="btn__secondary">
                  Declaration of Conformity
                </button>
              </li>
              <li>
                <button className="btn__secondary">Data sheet</button>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid lg:grid-cols-3">
          <div className="desc col-span-2 ">
            <h1 className="text__black font-bold text-[28px] mb-6 mt-24 ">
              Product Description:
            </h1>
            <p className="text__black leading-8">
              Our V-shaped Summit adventure harness comes with two points of
              connection. This collection of harnesses are colour coded for easy
              and fast size allocation. The step in design and different
              coloured right leg loop simplifies donning. The easy slide buckles
              make adjustability easy meaning resizing the harness is effortless
              and fast. The back and ventral connection points on this harness
              make it suitable for multiple activities. *14 times reduction in
              bacterial growth, according to ISO 20743:2013 contact with
              K.pneumoniae, commonly associated with healthcare infections such
              as E.coli.
            </p>
          </div>
        </div>
      </div>
      <ContactComponent />
      <LogoClouds />
    </>
  );
};

export default ProductDetails;
