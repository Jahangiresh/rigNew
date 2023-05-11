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

import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { ADMIN, IMAGE_URL } from "../../constants";
import {
  deleteAccreditation,
  fetchAccreditations,
  getAll,
  getStatus,
} from "../../features/accreditationsSlice";
import HeaderDown from "../components/header/HeaderDown";

export default function Accreditations() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accreditations = useSelector(getAll);
  const status = useSelector(getStatus);
  useEffect(() => {
    dispatch(fetchAccreditations());
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
        dispatch(deleteAccreditation(id));
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
        <h2>Akkreditasiyalar</h2>
      </HeaderDown>
      <TableContainer component={Paper} className="adminadvocates">
        <Helmet>
          <title>blogs</title>
        </Helmet>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell align="left">Adı</TableCell>
              <TableCell align="right">
                <span>edit</span>/<span>delete</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accreditations &&
              accreditations.map((accreditation) => (
                <TableRow
                  key={accreditation.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <img
                      className="adminadvocates__img"
                      src={`${IMAGE_URL}${accreditation.image.filePath}`}
                      alt={accreditation.image.fileName}
                    />
                  </TableCell>
                  <TableCell align="left">
                    {accreditation.description}
                  </TableCell>
                  <TableCell align="right" className="adminadvocates__icons">
                    <AiOutlineEdit
                      onClick={() =>
                        navigate(`${ADMIN}/accreditations/${accreditation.id}`)
                      }
                      className="edit__icons"
                    />
                    <AiOutlineDelete
                      onClick={() => handleDelete(accreditation.id)}
                      className="edit__icons"
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <button
          onClick={() => navigate(`${ADMIN}/accreditations/create`)}
          className="adminadvocates__add"
        >
          Akkreditasiya əlavə et <AiOutlinePlusCircle className="plus__icon" />
        </button>
      </TableContainer>
    </>
  );
}
