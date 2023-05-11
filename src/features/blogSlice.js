import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, ADMIN } from "../constants";
import { toast } from "react-hot-toast";
import AuthService from "../admin/services/AuthService";

const initialState = {
  data: [],
  currentBlog: {},
  featuredBlogs: [],
  status: "idle",
  singleStatus: "idle",
  featuredStatus: "idle",
  error: "null",
  singleError: "null",
  featuredError: "null",
  pagination: {},
};

const getAccesToken = () => {
  const { accessToken } = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";
  return accessToken;
};

export const fetchBlog = createAsyncThunk(
  "blogs/fetchBlogs",
  async ({ search, pageNumber }) => {
    const response = await axios.get(
      `${BASE_URL}/blogs${
        search ? `?title=${search}&` : "?"
      }pageNumber=${pageNumber}&pageSize=6&orderByProperty=Id&isDesc=true`
    );
    return response;
  }
);

export const fetchFeaturedBlog = createAsyncThunk(
  "featuredBlogs/fetchFeaturedBlogs",
  async () => {
    const response = await axios.get(
      `${BASE_URL}/blogs?pageSize=6&orderByProperty=Id&isDesc=true`
    );
    return response.data;
  }
);

export const fetchSingleBlog = createAsyncThunk(
  "blog/fetchSingleBlog",
  async ({ id }) => {
    const response = await axios.get(`${BASE_URL}/blogs/${id}`);
    return response.data;
  }
);

export const createBlog = createAsyncThunk("blogs/postApi", async (payload) => {
  await axios
    .post(`${BASE_URL}/blogs`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getAccesToken()}`,
      },
    })
    .then(() => {
      toast.success("blog yaradıldı");
      window.location = `${ADMIN}/blogs`;
    })
    .catch(async (err) => {
      if (err.response.status === 401) {
        await AuthService.refreshToken();
      }
      Object.keys(err.response.data.errors).forEach((key) => {
        toast.error(err.response.data.errors[key]);
      });
    });
});

export const updateBlog = createAsyncThunk(
  "blogs/putApi",
  async ({ req, id }) => {
    await axios
      .put(`${BASE_URL}/blogs/${id}`, req, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getAccesToken()}`,
        },
      })
      .then(() => {
        toast.success("dəyişiklik yadaşa verildi");
        window.location = `${ADMIN}/blogs`;
      })
      .catch(async (err) => {
        if (err.response.status === 401) {
          await AuthService.refreshToken();
        }
        Object.keys(err.response.data.errors).forEach((key) => {
          toast.error(err.response.data.errors[key]);
        });
      });
  }
);

export const deleteBlog = createAsyncThunk(
  "blogs/deleteApi",
  async (payload) => {
    await axios
      .delete(`${BASE_URL}/blogs/${payload}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getAccesToken()}`,
        },
      })
      .then(() => {
        toast.success("blog silindi");
      })
      .catch(async (err) => {
        if (err.response.status === 401) {
          await AuthService.refreshToken();
        }
        Object.keys(err.response.data.errors).forEach((key) => {
          toast.error(err.response.data.errors[key]);
        });
      });
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleBlog.pending, (state) => {
        state.singleStatus = "loading";
      })
      .addCase(fetchFeaturedBlog.pending, (state) => {
        state.featuredStatus = "loading";
      })
      .addCase(fetchBlog.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { data } = action.payload;
        state.data = data;
        const pagination = action.payload.headers["x-pagination"];
        state.pagination = JSON.parse(pagination);
      })
      .addCase(fetchSingleBlog.fulfilled, (state, action) => {
        state.singleStatus = "succeeded";
        state.currentBlog = action.payload;
      })
      .addCase(fetchFeaturedBlog.fulfilled, (state, action) => {
        state.featuredStatus = "succeeded";
        state.featuredBlogs = action.payload;
      })
      .addCase(fetchBlog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error(action.error.message);
      })
      .addCase(fetchSingleBlog.rejected, (state, action) => {
        state.singleStatus = "failed";
        state.singleError = action.error;
        toast.error(action.error.message);
      })
      .addCase(fetchFeaturedBlog.rejected, (state, action) => {
        state.featuredStatus = "failed";
        state.featuredError = action.error.message;
      });
  },
});

export const getAllBlogs = (state) => state.blogs.data;
export const getSingleBlogs = (state) => state.blogs.currentBlog;
export const getFeaturedBlogs = (state) => state.blogs.featuredBlogs;
export const getStatus = (state) => state.blogs.status;
export const getSingleStatus = (state) => state.blogs.singleStatus;
export const getFeaturedStatus = (state) => state.blogs.featuredStatus;
export const getSingleError = (state) => state.blogs.singleError;
export const getFeaturedError = (state) => state.blogs.featuredError;
export const getPagination = (state) => state.blogs.pagination;
export const getError = (state) => state.blogs.error;

export default blogSlice.reducer;
