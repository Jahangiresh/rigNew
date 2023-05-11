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
  AiOutlineQrcode,
} from "react-icons/ai";
import "../scss/adminadvocates.scss";
import LoadingBox from "../../components/LoadingBox";
import Swal from "sweetalert2";
import {
  getAllCertificates,
  getStatus,
  getPagination,
  fetchCertificates,
  deleteCertificate,
} from "../../features/certificatesSlice";

import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { ADMIN, BASE_URL, IMAGE_URL } from "../../constants";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import HeaderDown from "../components/header/HeaderDown";

export default function Certificates() {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const [qr, setQr] = useState();
  const dispatch = useDispatch();
  const certificates = useSelector(getAllCertificates);
  const status = useSelector(getStatus);
  const pagination = useSelector(getPagination);
  useEffect(() => {
    dispatch(fetchCertificates({ pageNumber }));
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
        dispatch(deleteCertificate(id));
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
  const getAccesToken = () => {
    const { accessToken } = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : "";
    return accessToken;
  };
  const getQrCode = async (id) => {
    await axios({
      url: `${BASE_URL}/certificates/qrcodes/${id}`,
      method: "GET",
      responseType: "blob",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getAccesToken()}`,
      },
    }).then((response) => {
      const contentDisposition = response.headers["content-disposition"];
      let filename = "file";
      if (contentDisposition) {
        const matches = contentDisposition.match(
          /filename\*?=['"]?(?:UTF-\d['"]*)?([^;'"]*)['"]?/i
        );
        if (matches && matches[1]) {
          filename = decodeURIComponent(matches[1].replace(/\+/g, " "));
        }
      }

      const blob = new Blob([response.data], { type: response.data.type });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = filename;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    });
  };
  if (status === "loading") return <LoadingBox />;

  return (
    <>
      <HeaderDown>
        <h2>Sertifikatlar</h2>
      </HeaderDown>
      <TableContainer component={Paper} className="adminadvocates">
        <Helmet>
          <title>blogs</title>
        </Helmet>
        <div>
          <Toaster />
        </div>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Ad</TableCell>
              <TableCell align="left">Soyad</TableCell>
              <TableCell align="left">Kod</TableCell>
              <TableCell align="left">Təlim</TableCell>
              <TableCell align="right">QR</TableCell>
              <TableCell align="right">
                <span>edit</span>/<span>delete</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {certificates.map((certificate) => (
              <TableRow
                key={certificate.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {certificate.firstName}
                </TableCell>
                <TableCell align="left">{certificate.lastName}</TableCell>
                <TableCell align="left">{certificate.certCode}</TableCell>
                <TableCell align="left">
                  {certificate.education.title}
                </TableCell>
                <TableCell align="right" className="adminadvocates__icons">
                  <AiOutlineQrcode
                    className="edit__icons"
                    onClick={() => getQrCode(certificate.id)}
                  />
                </TableCell>
                <TableCell align="right" className="adminadvocates__icons">
                  <AiOutlineEdit
                    onClick={() =>
                      navigate(`${ADMIN}/certificates/${certificate.id}`)
                    }
                    className="edit__icons"
                  />
                  <AiOutlineDelete
                    onClick={() => handleDelete(certificate.id)}
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
        <button
          onClick={() => navigate(`${ADMIN}/certificates/create`)}
          className="adminadvocates__add"
        >
          Sertifikat əlavə et <AiOutlinePlusCircle className="plus__icon" />
        </button>
      </TableContainer>
    </>
  );
}
