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
import { MdCastForEducation } from "react-icons/md";
import "../scss/adminadvocates.scss";
import LoadingBox from "../../components/LoadingBox";
import Swal from "sweetalert2";

import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { ADMIN, BASE_URL, IMAGE_URL } from "../../constants";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import {
  deleteTrainingsSubCategories,
  fetchTrainingsSubCategories,
  getAllTrainingsSubcategories,
  getStatus,
} from "../../features/trainingssubcategoriesslice";
import axios from "axios";
import HeaderDown from "../components/header/HeaderDown";

export default function TrainingsCategory() {
  const params = useParams();
  const id = Number(params.id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const trainingsSubCategories = useSelector(getAllTrainingsSubcategories);
  const status = useSelector(getStatus);
  useEffect(() => {
    dispatch(fetchTrainingsSubCategories({ categoryId: id }));
  }, [dispatch, id]);
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
        dispatch(deleteTrainingsSubCategories(id));
        setTimeout(() => {
          window.location.reload(false);
        }, 700);
        if (true) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      }
    });
  };

  if (status === "loading") return <LoadingBox />;

  return (
    <>
      <HeaderDown>
        <h2>Təlimlər kategoryası</h2>
      </HeaderDown>
      <TableContainer component={Paper} className="adminadvocates">
        <Helmet>
          <title>Trainings Category</title>
        </Helmet>
        <div>
          <Toaster />
        </div>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Şəkil</TableCell>
              <TableCell align="left">Ad</TableCell>
              <TableCell align="right">Təlimlər</TableCell>
              <TableCell align="right">
                <span>düzəliş etmək</span>/<span>silmək</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trainingsSubCategories &&
              trainingsSubCategories.map((trainingsSubCategory) => (
                <TableRow
                  key={trainingsSubCategory.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <img
                      className="adminadvocates__img"
                      src={`${IMAGE_URL}${trainingsSubCategory.image.filePath}`}
                      alt={trainingsSubCategory.image.fileName}
                    />
                  </TableCell>
                  <TableCell align="left">
                    {trainingsSubCategory.title.length > 20
                      ? trainingsSubCategory.title.slice(0, 20) + "..."
                      : trainingsSubCategory.title}
                  </TableCell>
                  <TableCell align="right" className="adminadvocates__icons">
                    <MdCastForEducation
                      onClick={() =>
                        navigate(
                          `${ADMIN}/trainings?sub=${trainingsSubCategory.id}`
                        )
                      }
                      className="edit__icons"
                    />
                  </TableCell>
                  <TableCell align="right" className="adminadvocates__icons">
                    <AiOutlineEdit
                      onClick={() =>
                        navigate(
                          `${ADMIN}/trainingscategory?sub=${trainingsSubCategory.id}`
                        )
                      }
                      className="edit__icons"
                    />
                    <AiOutlineDelete
                      onClick={() => handleDelete(trainingsSubCategory.id)}
                      className="edit__icons"
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <button
          onClick={() => navigate(`${ADMIN}/trainingscategory/${id}/create`)}
          className="adminadvocates__add"
        >
          Sub categorya əlavə et <AiOutlinePlusCircle className="plus__icon" />
        </button>
      </TableContainer>
    </>
  );
}
