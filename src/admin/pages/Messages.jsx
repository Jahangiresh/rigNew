import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import "../scss/adminadvocates.scss";
import LoadingBox from "../../components/LoadingBox";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { ADMIN } from "../../constants";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import {
  deleteMessage,
  fetchMessages,
  getAll,
  getPagination,
  getStatus,
} from "../../features/MessagesSlice";
import HeaderDown from "../components/header/HeaderDown";

export default function Accreditations() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const messages = useSelector(getAll);
  const pagination = useSelector(getPagination);
  const status = useSelector(getStatus);
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    dispatch(fetchMessages({ pageNumber }));
  }, [dispatch, pageNumber]);
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
        dispatch(deleteMessage(id));
        setTimeout(() => {
          window.location.reload(false);
        }, 700);
        if (true) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      }
    });
  };
  const handleChangePage = (event, newPage) => {
    setPageNumber(newPage);
  };
  if (status === "loading") return <LoadingBox />;

  return (
    <>
      <HeaderDown>
        <h2>İsamarıclar</h2>
      </HeaderDown>
      <TableContainer component={Paper} className="adminadvocates">
        <Helmet>
          <title>blogs</title>
        </Helmet>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>İstifadəçi adı</TableCell>
              <TableCell align="left">İstifadəçi Maili</TableCell>
              <TableCell align="left">Messaj</TableCell>
              <TableCell align="right">
                <span>delete</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages &&
              messages.map((message) => (
                <TableRow
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate(`${ADMIN}/messages/${message.id}`);
                  }}
                  key={message.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {message.name}
                  </TableCell>
                  <TableCell align="left">{message.email}</TableCell>
                  <TableCell align="left">
                    {message.messageBody && message.messageBody.length > 15
                      ? message.messageBody.slice(0, 15) + "..."
                      : message.messageBody}
                  </TableCell>
                  <TableCell align="right" className="adminadvocates__icons">
                    <AiOutlineDelete
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(message.id);
                      }}
                      className="edit__icons"
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
          >
            <Stack spacing={2}>
              <Pagination
                count={pagination.TotalPages}
                page={pagination.CurrentPage}
                onChange={handleChangePage}
                variant="outlined"
                shape="rounded"
                sx={{
                  "& .Mui-selected": {
                    backgroundColor: "#e87812",
                    color: "#fff",
                    margin: "0",
                  },
                  "& .MuiPaginationItem-root:hover": {
                    color: "#e87812",
                  },
                  "& .Mui-selected:hover": {
                    backgroundColor: "#e87812",
                    color: "#fff",
                  },
                }}
              />
            </Stack>
          </div>
        </Table>
      </TableContainer>
    </>
  );
}
