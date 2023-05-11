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

import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { ADMIN, IMAGE_URL } from "../../constants";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import {
  deleteEngineerService,
  fetchEngineerServices,
  getAllEngineerService,
  getEngineerServicePagination,
  getEngineerServiceStatus,
} from "../../features/engineerServicesSlice";
import HeaderDown from "../components/header/HeaderDown";

export default function EngineerServices() {
  const query = useQuery();
  const sub = Number(query.get("sub"));
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();
  const engineerServices = useSelector(getAllEngineerService);
  const status = useSelector(getEngineerServiceStatus);
  const pagination = useSelector(getEngineerServicePagination);
  useEffect(() => {
    dispatch(
      fetchEngineerServices({ search: "", pageNumber, sub, filter: true })
    );
  }, [dispatch, pageNumber, sub]);
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
        dispatch(deleteEngineerService(id));
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
        <h2>Mühəndislik Xidmətləri</h2>
      </HeaderDown>
      <TableContainer component={Paper} className="adminadvocates">
        <Helmet>
          <title>Engineer Services</title>
        </Helmet>
        <div>
          <Toaster />
        </div>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Şəkil</TableCell>
              <TableCell align="left">Başlıq</TableCell>
              <TableCell align="left">Alt başlıq</TableCell>
              <TableCell align="right">
                <span>düzəlt</span>/<span>sil</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {engineerServices.map((engineerService) => (
              <TableRow
                key={engineerService.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <img
                    className="adminadvocates__img"
                    src={`${IMAGE_URL}${engineerService.image.filePath}`}
                    alt={engineerService.image.fileName}
                  />
                </TableCell>
                <TableCell align="left">
                  {engineerService.title.length > 20
                    ? engineerService.title.slice(0, 20) + "..."
                    : engineerService.title}
                </TableCell>
                <TableCell align="left">
                  {engineerService.subTitle.length > 20
                    ? engineerService.subTitle.slice(0, 20) + "..."
                    : engineerService.subTitle}
                </TableCell>
                <TableCell align="right" className="adminadvocates__icons">
                  <AiOutlineEdit
                    onClick={() =>
                      navigate(
                        `${ADMIN}/engineerservices/${engineerService.id}`
                      )
                    }
                    className="edit__icons"
                  />
                  <AiOutlineDelete
                    onClick={() => handleDelete(engineerService.id)}
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
          onClick={() =>
            navigate(`${ADMIN}/engineerservices/create?sub=${sub}`)
          }
          className="adminadvocates__add"
        >
          Mühəndsilik xidməti əlavə et{" "}
          <AiOutlinePlusCircle className="plus__icon" />
        </button>
      </TableContainer>
    </>
  );
}

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
