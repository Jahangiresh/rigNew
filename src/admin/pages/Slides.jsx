import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import "../scss/adminadvocates.scss";
import LoadingBox from "../../components/LoadingBox";
import Swal from "sweetalert2";

import {
  getAllSlides,
  deleteSlide,
  getStatus,
  slideFetch,
} from "../../features/slideSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { ADMIN, IMAGE_URL } from "../../constants";
import { Toaster } from "react-hot-toast";
import HeaderDown from "../components/header/HeaderDown";

export default function Slides() {
  const navigate = useNavigate();
  const slides = useSelector(getAllSlides);
  const status = useSelector(getStatus);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(slideFetch());
  }, [dispatch]);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteSlide(id));
        setTimeout(() => {
          window.location.reload(false);
        }, 700);
        if (true) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      }
    });
  };
  if (status === "pending") return <LoadingBox />;

  return (
    <>
      <HeaderDown>
        <h2>Slaydlar</h2>
      </HeaderDown>
      <TableContainer component={Paper} className="adminadvocates">
        <Helmet>
          <title>slides</title>
        </Helmet>
        <div>
          <Toaster />
        </div>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell align="left">order</TableCell>
              <TableCell align="right">
                <span>edit</span>/<span>delete</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slides.map((slide) => (
              <TableRow
                key={slide.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <img
                    className="adminadvocates__img"
                    src={`${IMAGE_URL}${slide.image.filePath}`}
                    alt="img"
                  />
                </TableCell>
                <TableCell align="left">{slide.order}</TableCell>
                <TableCell align="right" className="adminadvocates__icons">
                  <AiOutlineEdit
                    onClick={() => navigate(`${ADMIN}/slides/${slide.id}`)}
                    className="edit__icons"
                  />
                  <AiOutlineDelete
                    onClick={() => handleDelete(slide.id)}
                    className="edit__icons"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <button
          onClick={() => navigate(`${ADMIN}/slides/create`)}
          className="adminadvocates__add"
        >
          slayder əlavə et <AiOutlinePlusCircle className="plus__icon" />
        </button>
      </TableContainer>
    </>
  );
}
