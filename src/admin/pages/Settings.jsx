import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../scss/settings.scss";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import {
  deleteSettings,
  fetchSettings,
  getAllSettings,
  getStatus,
} from "../../features/settingsSlice";
import { useEffect } from "react";
import { ADMIN } from "../../constants";
import { IMAGE_URL } from "../../constants";
import LoadingBox from "../../components/LoadingBox";
import HeaderDown from "../components/header/HeaderDown";
import ReactHtmlParser from "react-html-parser";

export default function Settings() {
  const dispatch = useDispatch();
  const settings = useSelector(getAllSettings);
  const status = useSelector(getStatus);
  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);
  const handleDelete = (e, id) => {
    e.stopPropagation();
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
        dispatch(deleteSettings(id));
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
        <h2>Settings</h2>
      </HeaderDown>
      <Helmet>
        <title>setting</title>
      </Helmet>
      <Link
        to={`${ADMIN}/setting/create`}
        style={{
          padding: "5px 10px",
          backgroundColor: "green",
          color: "white",
          borderRadius: "20px",
        }}
      >
        Setting Yaratmaq
      </Link>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Açar söz</TableCell>
              <TableCell>File & Dəyər</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {settings &&
              settings.map((setting, index) => (
                <TableRow
                  onClick={() => {
                    window.location = `${ADMIN}/setting/${setting.id}`;
                  }}
                  style={{ cursor: "pointer" }}
                  key={setting.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {setting.key}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {setting.image ? (
                      <img
                        style={{ width: "50px" }}
                        src={`${IMAGE_URL}${setting.image.filePath}`}
                        alt=""
                      />
                    ) : setting.key === "about" ? (
                      ReactHtmlParser(setting?.value?.slice(0, 20))
                    ) : (
                      setting.value
                    )}
                  </TableCell>
                  <TableCell component="th" scope="row" align="right">
                    <button
                      className="btn btn-danger"
                      onClick={(e) => handleDelete(e, setting.id)}
                    >
                      sil
                    </button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
