import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../constants";
import { toast } from "react-hot-toast";
import AuthService from "../admin/services/AuthService";

const initialState = {
  data: [],
  currentTraining: {},
  featuredTrainings: [],
  pagination: {},
  status: "idle",
  singleStatus: "idle",
  featuredStatus: "idle",
  error: "null",
  singleError: "null",
  featuredError: "null",
};

const getAccesToken = () => {
  const { accessToken } = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";
  return accessToken;
};

export const fetchTrainings = createAsyncThunk(
  "trainings/fetchTrainings",
  async ({ search, pageNumber, sub, pageSize, filter }) => {
    const response = await axios.get(
      `${BASE_URL}/educations${search ? `?title=${search}&` : "?"}${
        sub ? `educationSubcategoryId=${sub}&` : ""
      }${pageNumber ? `pageNumber=${pageNumber}` : ""}&pageSize=${
        !pageSize ? 6 : pageSize
      }${filter ? `&orderByProperty=Id&isDesc=${filter}` : ""}`
    );
    return response;
  }
);

export const fetchFeaturedTrainings = createAsyncThunk(
  "featuredTrainings/fetchFeatuerdTrainings",
  async () => {
    const response = await axios.get(
      `${BASE_URL}/educations?pageSize=8&orderByProperty=Id&isDesc=true`
    );
    return response.data;
  }
);

export const fetchSingleTraining = createAsyncThunk(
  "training/fetchSingleTraining",
  async ({ id }) => {
    const response = await axios.get(`${BASE_URL}/educations/${id}`);
    return response.data;
  }
);

export const createTraining = createAsyncThunk(
  "trainings/postApi",
  async (payload) => {
    await axios
      .post(`${BASE_URL}/educations`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getAccesToken()}`,
        },
      })
      .then(() => {
        toast.success("yaradıldı");
        window.history.back();
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

export const updateTraining = createAsyncThunk(
  "trainings/putApi",
  async ({ req, id }) => {
    await axios
      .put(`${BASE_URL}/educations/${id}`, req, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getAccesToken()}`,
        },
      })
      .then(() => {
        toast.success("dəyişiklik yadaşa verildi");
        window.history.back();
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

export const deleteTraining = createAsyncThunk(
  "trainings/deleteApi",
  async (payload) => {
    await axios
      .delete(`${BASE_URL}/educations/${payload}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getAccesToken()}`,
        },
      })
      .then(() => {
        toast.success("Təlim silindi");
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

const trainingsSlice = createSlice({
  name: "trainings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrainings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleTraining.pending, (state) => {
        state.singleStatus = "loading";
      })
      .addCase(fetchFeaturedTrainings.pending, (state) => {
        state.featuredStatus = "loading";
      })
      .addCase(fetchTrainings.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { data, headers } = action.payload;
        state.data = data;
        state.pagination = JSON.parse(headers["x-pagination"]);
      })
      .addCase(fetchSingleTraining.fulfilled, (state, action) => {
        state.singleStatus = "succeeded";
        state.currentTraining = action.payload;
      })
      .addCase(fetchFeaturedTrainings.fulfilled, (state, action) => {
        state.featuredStatus = "succeeded";
        state.featuredTrainings = action.payload;
      })
      .addCase(fetchTrainings.rejected, (state, action) => {
        state.status = "faild";
        state.error = action.error.message;
      })
      .addCase(fetchSingleTraining.rejected, (state, action) => {
        state.singleStatus = "faild";
        state.singleError = action.error.message;
      })
      .addCase(fetchFeaturedTrainings.rejected, (state, action) => {
        state.featuredStatus = "faild";
        state.featuredError = action.error?.message;
      });
  },
});

export const getAllTrainings = (state) => state.trainings.data;
export const getTrainingsPagination = (state) => state.trainings.pagination;
export const getTrainingsStatus = (state) => state.trainings.status;
export const getTrainingsError = (state) => state.trainings.error;
export const getSingleTraining = (state) => state.trainings.currentTraining;
export const getSingleStatus = (state) => state.trainings.singleStatus;
export const getSingleError = (state) => state.trainings.singleError;
export const getFeaturedTraining = (state) => state.trainings.featuredTrainings;
export const getFeaturedStatus = (state) => state.trainings.featuredStatus;
export const getFeaturedError = (state) => state.trainings.featuredError;

export default trainingsSlice.reducer;
