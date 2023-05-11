import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, ADMIN } from "../constants";
import { toast } from "react-hot-toast";
import AuthService from "../admin/services/AuthService";

const initialState = {
  data: [],
  currentComment: {},
  status: "idle",
  singleStatus: "idle",
  error: "null",
  singleError: "null",
  pagination: {},
};

const getAccesToken = () => {
  const { accessToken } = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";
  return accessToken;
};

export const fetchCustomerComment = createAsyncThunk(
  "customerComments/fetchCustomerComments",
  async ({ pageNumber }) => {
    const response = await axios.get(
      `${BASE_URL}/customercomments?pageNumber=${pageNumber}&pageSize=6&orderByProperty=Id&isDesc=true`
    );
    return response;
  }
);

export const fetchSingleCustomerComment = createAsyncThunk(
  "customerComment/fetchSingleCustomerComment",
  async ({ id }) => {
    const response = await axios.get(`${BASE_URL}/customercomments/${id}`);
    return response.data;
  }
);

export const createCustomerComments = createAsyncThunk(
  "customerComments/postApi",
  async (payload) => {
    await axios
      .post(`${BASE_URL}/customercomments`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getAccesToken()}`,
        },
      })
      .then(() => {
        toast.success("Rəy yaradıldı");
        window.location = `${ADMIN}/customercomments`;
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

export const updateCustomerComments = createAsyncThunk(
  "customerComments/putApi",
  async ({ req, id }) => {
    await axios
      .put(`${BASE_URL}/customercomments/${id}`, req, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getAccesToken()}`,
        },
      })
      .then(() => {
        toast.success("dəyişiklik yadaşa verildi");
        window.location = `${ADMIN}/customercomments`;
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

export const deleteCustomerComments = createAsyncThunk(
  "customerComments/deleteApi",
  async (payload) => {
    await axios
      .delete(`${BASE_URL}/customercomments/${payload}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getAccesToken()}`,
        },
      })
      .then(() => {
        toast.success("rəy silindi");
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

const customerCommentSlice = createSlice({
  name: "customerComment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleCustomerComment.pending, (state) => {
        state.singleStatus = "loading";
      })
      .addCase(fetchCustomerComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { data } = action.payload;
        state.data = data;
        const pagination = action.payload.headers["x-pagination"];
        state.pagination = JSON.parse(pagination);
      })
      .addCase(fetchSingleCustomerComment.fulfilled, (state, action) => {
        state.singleStatus = "succeeded";
        state.currentComment = action.payload;
      })
      .addCase(fetchCustomerComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error(action.error.message);
      })
      .addCase(fetchSingleCustomerComment.rejected, (state, action) => {
        state.singleStatus = "failed";
        state.singleError = action.error;
        toast.error(action.error.message);
      });
  },
});

export const getAll = (state) => state.customerComment.data;
export const getSingleCustomerComment = (state) =>
  state.customerComment.currentComment;
export const getStatus = (state) => state.customerComment.status;
export const getSingleStatus = (state) => state.customerComment.singleStatus;
export const getSingleError = (state) => state.customerComment.singleError;
export const getPagination = (state) => state.customerComment.pagination;
export const getError = (state) => state.customerComment.error;

export default customerCommentSlice.reducer;
