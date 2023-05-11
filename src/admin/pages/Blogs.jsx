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
import {
  deleteBlog,
  fetchBlog,
  getAllBlogs,
  getPagination,
  getStatus,
} from "../../features/blogSlice";
import { useEffect } from "react";
import { ADMIN, IMAGE_URL } from "../../constants";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import HeaderDown from "../components/header/HeaderDown";

export default function Blogs() {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();
  const blogs = useSelector(getAllBlogs);
  const status = useSelector(getStatus);
  const pagination = useSelector(getPagination);
  useEffect(() => {
    dispatch(fetchBlog({ search: "", pageNumber }));
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
        dispatch(deleteBlog(id));
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
        <h2>Xəbərlər</h2>
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
              <TableCell>Image</TableCell>
              <TableCell align="left">title</TableCell>
              <TableCell align="right">
                <span>edit</span>/<span>delete</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs &&
              blogs.map((blog) => (
                <TableRow
                  key={blog.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <img
                      className="adminadvocates__img"
                      src={`${IMAGE_URL}${blog.image.filePath}`}
                      alt={blog.image.fileName}
                    />
                  </TableCell>
                  <TableCell align="left">
                    {blog.title.length > 20
                      ? blog.title.slice(0, 20) + "..."
                      : blog.title}
                  </TableCell>
                  <TableCell align="right" className="adminadvocates__icons">
                    <AiOutlineEdit
                      onClick={() => navigate(`${ADMIN}/blogs/${blog.id}`)}
                      className="edit__icons"
                    />
                    <AiOutlineDelete
                      onClick={() => handleDelete(blog.id)}
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
          onClick={() => navigate(`${ADMIN}/blogs/create`)}
          className="adminadvocates__add"
        >
          blog əlavə et <AiOutlinePlusCircle className="plus__icon" />
        </button>
      </TableContainer>
    </>
  );
}
