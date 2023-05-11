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
  deleteEquipment,
  fetchEquipments,
  getAllEquipments,
  getEquipmentsPagination,
  getEquipmentsStatus,
} from "../../features/equipmentsSlice";
import HeaderDown from "../components/header/HeaderDown";

export default function Equipments() {
  const query = useQuery();
  const sub = Number(query.get("sub"));
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();
  const equipments = useSelector(getAllEquipments);
  const status = useSelector(getEquipmentsStatus);
  const pagination = useSelector(getEquipmentsPagination);
  useEffect(() => {
    dispatch(fetchEquipments({ search: "", pageNumber }));
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
        dispatch(deleteEquipment(id));
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
        <h2>Təchizat</h2>
      </HeaderDown>
      <TableContainer component={Paper} className="adminadvocates">
        <Helmet>
          <title>Equipments</title>
        </Helmet>
        <div>
          <Toaster />
        </div>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Şəkil</TableCell>
              <TableCell align="left">Başlıq</TableCell>
              <TableCell align="left">Kod</TableCell>
              <TableCell align="right">
                <span>düzəlt</span>/<span>sil</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {equipments &&
              equipments.map((equipment) => (
                <TableRow
                  key={equipment.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {equipment?.images.map((image, index) =>
                      image.isMain ? (
                        <img
                          className="adminadvocates__img"
                          src={`${IMAGE_URL}${image?.filePath}`}
                          alt={image?.fileName}
                        />
                      ) : (
                        ""
                      )
                    )}
                  </TableCell>
                  <TableCell align="left">
                    {equipment.title.length > 20
                      ? equipment.title.slice(0, 20) + "..."
                      : equipment.title}
                  </TableCell>
                  <TableCell align="left">{equipment.productCode}</TableCell>
                  <TableCell align="right" className="adminadvocates__icons">
                    <AiOutlineEdit
                      onClick={() =>
                        navigate(`${ADMIN}/equipments/${equipment.id}`)
                      }
                      className="edit__icons"
                    />
                    <AiOutlineDelete
                      onClick={() => handleDelete(equipment.id)}
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
          onClick={() => navigate(`${ADMIN}/equipments/create?sub=${sub}`)}
          className="adminadvocates__add"
        >
          Təchizat əlavə et <AiOutlinePlusCircle className="plus__icon" />
        </button>
      </TableContainer>
    </>
  );
}

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
