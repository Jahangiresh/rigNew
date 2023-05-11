import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../constants";
import { toast } from "react-hot-toast";
import AuthService from "../admin/services/AuthService";

const initialState = {
  data: [],
  currentEngineerService: {},
  pagination: {},
  status: "idle",
  singleStatus: "idle",
  error: "null",
  singleError: "null",
};

const getAccesToken = () => {
  const { accessToken } = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";
  return accessToken;
};

export const fetchEngineerServices = createAsyncThunk(
  "engineerServices/fetchEngineerServices",
  async ({ search, pageNumber, sub, filter }) => {
    const response = await axios.get(
      `${BASE_URL}/engineerservices${search ? `?title=${search}&` : "?"}${
        sub ? `engineerServicesSubcategoryId=${sub}&` : ""
      }${
        pageNumber ? `pageNumber=${pageNumber}` : ""
      }&pageSize=6&orderByProperty=Id&isDesc=${filter}`
    );
    return response;
  }
);

export const fetchSingleEngineerService = createAsyncThunk(
  "engineerServices/fetchSingleEngineerService",
  async ({ id }) => {
    const response = await axios.get(`${BASE_URL}/engineerservices/${id}`);
    return response.data;
  }
);

export const createEngineerService = createAsyncThunk(
  "engineerServices/postApi",
  async (payload) => {
    await axios
      .post(`${BASE_URL}/engineerservices`, payload, {
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

export const updateEngineerService = createAsyncThunk(
  "engineerServices/putApi",
  async ({ req, id }) => {
    await axios
      .put(`${BASE_URL}/engineerservices/${id}`, req, {
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

export const deleteEngineerService = createAsyncThunk(
  "engineerServices/deleteApi",
  async (payload) => {
    await axios
      .delete(`${BASE_URL}/engineerservices/${payload}`, {
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

const engineerServicesSlice = createSlice({
  name: "engineerServices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEngineerServices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleEngineerService.pending, (state) => {
        state.singleStatus = "loading";
      })
      .addCase(fetchEngineerServices.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { data, headers } = action.payload;
        state.data = data;
        state.pagination = JSON.parse(headers["x-pagination"]);
      })
      .addCase(fetchSingleEngineerService.fulfilled, (state, action) => {
        state.singleStatus = "succeeded";
        state.currentEngineerService = action.payload;
      })
      .addCase(fetchEngineerServices.rejected, (state, action) => {
        state.status = "faild";
        state.error = action.error.message;
      })
      .addCase(fetchSingleEngineerService.rejected, (state, action) => {
        state.singleStatus = "faild";
        state.singleError = action.error.message;
      });
  },
});

export const getAllEngineerService = (state) => state.engineerServices.data;
export const getEngineerServicePagination = (state) =>
  state.engineerServices.pagination;
export const getEngineerServiceStatus = (state) =>
  state.engineerServices.status;
export const getEngineerServiceError = (state) => state.engineerServices.error;
export const getSingleEngineerService = (state) =>
  state.engineerServices.currentEngineerService;
export const getSingleStatus = (state) => state.engineerServices.singleStatus;
export const getSingleError = (state) => state.engineerServices.singleError;

export default engineerServicesSlice.reducer;
