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
  deleteTraining,
  fetchTrainings,
  getAllTrainings,
  getTrainingsPagination,
  getTrainingsStatus,
} from "../../features/trainingsSlice";
import HeaderDown from "../components/header/HeaderDown";

export default function Trainings() {
  const query = useQuery();
  const sub = Number(query.get("sub"));
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();
  const trainings = useSelector(getAllTrainings);
  const status = useSelector(getTrainingsStatus);
  const pagination = useSelector(getTrainingsPagination);
  useEffect(() => {
    dispatch(fetchTrainings({ search: "", pageNumber, sub }));
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
        dispatch(deleteTraining(id));
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
        <h2>Təlimlər</h2>
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
              <TableCell>Şəkil</TableCell>
              <TableCell align="left">Başlıq</TableCell>
              <TableCell align="left">Alt başlıq</TableCell>
              <TableCell align="right">
                <span>düzəlt</span>/<span>sil</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trainings.map((training) => (
              <TableRow
                key={training.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <img
                    className="adminadvocates__img"
                    src={`${IMAGE_URL}${training.image.filePath}`}
                    alt={training.image.fileName}
                  />
                </TableCell>
                <TableCell align="left">
                  {training.title.length > 20
                    ? training.title.slice(0, 20) + "..."
                    : training.title}
                </TableCell>
                <TableCell align="left">
                  {training.subTitle.length > 20
                    ? training.subTitle.slice(0, 20) + "..."
                    : training.subTitle}
                </TableCell>
                <TableCell align="right" className="adminadvocates__icons">
                  <AiOutlineEdit
                    onClick={() =>
                      navigate(`${ADMIN}/trainings/${training.id}`)
                    }
                    className="edit__icons"
                  />
                  <AiOutlineDelete
                    onClick={() => handleDelete(training.id)}
                    className="edit__icons"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <div
          
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
          onClick={() => navigate(`${ADMIN}/trainings/create?sub=${sub}`)}
          className="adminadvocates__add"
        >
          Təlim əlavə et <AiOutlinePlusCircle className="plus__icon" />
        </button>
      </TableContainer>
    </>
  );
}

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
