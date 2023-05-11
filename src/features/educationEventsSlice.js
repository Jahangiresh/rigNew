import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, ADMIN } from "../constants";
import { toast } from "react-hot-toast";
import AuthService from "../admin/services/AuthService";

const initialState = {
  data: [],
  currentEducationEvent: {},
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

export const fetchEducationEvents = createAsyncThunk(
  "educationEvents/fetchEducationEvents",
  async ({ pageNumber }) => {
    const response = await axios.get(
      `${BASE_URL}/educationevents?pageNumber=${pageNumber}&pageSize=6&orderByProperty=Id&isDesc=true`
    );
    return response;
  }
);

export const fetchSingleEducationEvents = createAsyncThunk(
  "educationEvents/fetchSingleEducationEvents",
  async ({ id }) => {
    const response = await axios.get(`${BASE_URL}/educationevents/${id}`);
    return response.data;
  }
);

export const createEducationEvents = createAsyncThunk(
  "educationEvents/postApi",
  async (payload) => {
    await axios
      .post(`${BASE_URL}/educationevents`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccesToken()}`,
        },
      })
      .then((res) => {
        toast.success("yaradıldı");
        window.location = `${ADMIN}/educationevents`;
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

export const updateEducationEvents = createAsyncThunk(
  "educationEvents/putApi",
  async ({ req, id }) => {
    await axios
      .put(`${BASE_URL}/educationevents/${id}`, req, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccesToken()}`,
        },
      })
      .then(() => {
        toast.success("dəyişiklik yadaşa verildi");
        window.location = `${ADMIN}/educationevents`;
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

export const deleteEducationEvents = createAsyncThunk(
  "educationEvents/deleteApi",
  async (payload) => {
    await axios
      .delete(`${BASE_URL}/educationevents/${payload}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getAccesToken()}`,
        },
      })
      .then(() => {
        toast.success("silindi");
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

const educationEventsSlice = createSlice({
  name: "educationEvents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEducationEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleEducationEvents.pending, (state) => {
        state.singleStatus = "loading";
      })
      .addCase(fetchEducationEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { data } = action.payload;
        state.data = data;
        const pagination = action.payload.headers["x-pagination"];
        state.pagination = JSON.parse(pagination);
      })
      .addCase(fetchSingleEducationEvents.fulfilled, (state, action) => {
        state.singleStatus = "succeeded";
        state.currentEducationEvent = action.payload;
      })
      .addCase(fetchEducationEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error(action.error.message);
      })
      .addCase(fetchSingleEducationEvents.rejected, (state, action) => {
        state.singleStatus = "failed";
        state.singleError = action.error;
        toast.error(action.error.message);
      });
  },
});

export const getAllEducationEvents = (state) => state.educationEvents.data;
export const getSingleEducationEvents = (state) =>
  state.educationEvents.currentEducationEvent;
export const getStatus = (state) => state.educationEvents.status;
export const getSingleStatus = (state) => state.educationEvents.singleStatus;
export const getSingleError = (state) => state.educationEvents.singleError;
export const getPagination = (state) => state.educationEvents.pagination;
export const getError = (state) => state.educationEvents.error;

export default educationEventsSlice.reducer;
