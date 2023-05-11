import React from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import prodImg from "../../assets/images/prod.png";
import { FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ProductsList = () => {
  const navigate = useNavigate();
  return (
    <>
      <Breadcrumbs title={"Prods--zirt pirt"} />
      <div className="container">
        <div className="grid grid-cols-3 max-sm:grid-cols-1 max-lg:grid-cols-2  py-10 gap-6">
          <div className="rounded-md shadow-md border border-[#e3e3e3]">
            <div className="pImage h-60 ">
              <img
                className="w-full h-full object-contain"
                src={prodImg}
                alt="img"
              />
            </div>
            <div className="content my-6 flex flex-col items-center px-6">
              <h1 className="font-bold text__black text-xl ">
                RGH13 Summit Harness
              </h1>
              <p className="my-2 text-center leading-7">
                Our V-shaped Summit adventure harness comes with two points of
                connection. This collection of harnesses are colour coded for
              </p>
              <button
                onClick={() => navigate("/products/10/1")}
                className="btn__secondary flex items-center"
              >
                See more <FiChevronRight />
              </button>
            </div>
          </div>
          <div className="rounded-md shadow-md border border-[#e3e3e3]">
            <div className="pImage h-60 ">
              <img
                className="w-full h-full object-contain"
                src={prodImg}
                alt="img"
              />
            </div>
            <div className="content my-6 flex flex-col items-center px-6">
              <h1 className="font-bold text__black text-xl ">
                RGH13 Summit Harness
              </h1>
              <p className="my-2 text-center leading-7">
                Our V-shaped Summit adventure harness comes with two points of
                connection. This collection of harnesses are colour coded for
              </p>
              <button className="btn__secondary flex items-center">
                See more <FiChevronRight />
              </button>
            </div>
          </div>{" "}
          <div className="rounded-md shadow-md border border-[#e3e3e3]">
            <div className="pImage h-60 ">
              <img
                className="w-full h-full object-contain"
                src={prodImg}
                alt="img"
              />
            </div>
            <div className="content my-6 flex flex-col items-center px-6">
              <h1 className="font-bold text__black text-xl ">
                RGH13 Summit Harness
              </h1>
              <p className="my-2 text-center leading-7">
                Our V-shaped Summit adventure harness comes with two points of
                connection. This collection of harnesses are colour coded for
              </p>
              <button className="btn__secondary flex items-center">
                See more <FiChevronRight />
              </button>
            </div>
          </div>{" "}
          <div className="rounded-md shadow-md border border-[#e3e3e3]">
            <div className="pImage h-60 ">
              <img
                className="w-full h-full object-contain"
                src={prodImg}
                alt="img"
              />
            </div>
            <div className="content my-6 flex flex-col items-center px-6">
              <h1 className="font-bold text__black text-xl ">
                RGH13 Summit Harness
              </h1>
              <p className="my-2 text-center leading-7">
                Our V-shaped Summit adventure harness comes with two points of
                connection. This collection of harnesses are colour coded for
              </p>
              <button className="btn__secondary flex items-center">
                See more <FiChevronRight />
              </button>
            </div>
          </div>{" "}
          <div className="rounded-md shadow-md border border-[#e3e3e3]">
            <div className="pImage h-60 ">
              <img
                className="w-full h-full object-contain"
                src={prodImg}
                alt="img"
              />
            </div>
            <div className="content my-6 flex flex-col items-center px-6">
              <h1 className="font-bold text__black text-xl ">
                RGH13 Summit Harness
              </h1>
              <p className="my-2 text-center leading-7">
                Our V-shaped Summit adventure harness comes with two points of
                connection. This collection of harnesses are colour coded for
              </p>
              <button className="btn__secondary flex items-center">
                See more <FiChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsList;
