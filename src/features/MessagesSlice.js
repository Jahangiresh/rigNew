import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ADMIN, BASE_URL } from "../constants";
import AuthService from "../admin/services/AuthService";

const initialState = {
  data: [],
  currentMessage: {},
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

export const fetchMessages = createAsyncThunk(
  "messages/messagesFetch",
  async ({ pageNumber }) => {
    const response = await axios
      .get(`${BASE_URL}/contactusforms?pageNumber=${pageNumber}&pageSize=8`, {
        headers: {
          Authorization: `Bearer ${getAccesToken()}`,
        },
      })
      .catch(async (err) => {
        if (err.response.status === 401) {
          await AuthService.refreshToken();
        }
      });
    return response;
  }
);

export const fetchSingleMessage = createAsyncThunk(
  "message/fetchSingleMessage",
  async ({ id }) => {
    const response = await axios
      .get(`${BASE_URL}/contactusforms/${id}`, {
        headers: {
          Authorization: `Bearer ${getAccesToken()}`,
        },
      })
      .catch(async (err) => {
        if (err.response.status === 401) {
          await AuthService.refreshToken();
        }
      });
    return response.data;
  }
);

export const createMessage = createAsyncThunk(
  "messages/postApi",
  async (payload) => {
    await axios
      .post(`${BASE_URL}/contactusforms`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getAccesToken()}`,
        },
      })
      .then(() => {
        toast.success("akkreditasiya yaradıldı");
        window.location = `${ADMIN}/accreditations`;
      })
      .catch((err) => {
        Object.keys(err.response.data.errors).forEach((key) => {
          toast.error(err.response.data.errors[key]);
        });
      });
  }
);

export const deleteMessage = createAsyncThunk(
  "message/deleteApi",
  async (payload) => {
    await axios
      .delete(`${BASE_URL}/contactusforms/${payload}`, {
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

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleMessage.pending, (state) => {
        state.singleStatus = "loading";
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { data, headers } = action.payload;
        state.data = data;
        const pagination = headers["x-pagination"];
        state.pagination = JSON.parse(pagination);
      })
      .addCase(fetchSingleMessage.fulfilled, (state, action) => {
        state.singleStatus = "succeeded";
        state.currentMessage = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = "faild";
        state.error = action.error.message;
      })
      .addCase(fetchSingleMessage.rejected, (state, action) => {
        state.singleStatus = "faild";
        state.singleError = action.error.message;
      });
  },
});

export const getAll = (state) => state.messages.data;
export const getPagination = (state) => state.messages.pagination;
export const getSingleMessage = (state) => state.messages.currentMessage;
export const getStatus = (state) => state.messages.status;
export const getSingleStatus = (state) => state.messages.singleStatus;
export const getError = (state) => state.messages.error;
export const getSingleError = (state) => state.messages.singleError;

export default messagesSlice.reducer;
