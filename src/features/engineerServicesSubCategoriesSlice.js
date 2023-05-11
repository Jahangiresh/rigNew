import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ADMIN, BASE_URL } from "../constants";
import toast from "react-hot-toast";
import AuthService from "../admin/services/AuthService";

const initialState = {
  data: [],
  currentEngineerServicesSubCategories: {},
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

export const fetchEngineerServicesSubCategories = createAsyncThunk(
  "engineerServicesSubCategories/fetchengineerServicesSubCategories",
  async () => {
    const response = await axios.get(
      `${BASE_URL}/engineerservicesubcategories?pageSize=50`
    );
    return response.data;
  }
);

export const fetchSingleEngineerServicesSubCategories = createAsyncThunk(
  "engineerServicesSubCategories/fetchSingleEngineerServicesSubCategories",
  async ({ id }) => {
    const response = await axios.get(
      `${BASE_URL}/engineerservicesubcategories/${id}`
    );
    return response.data;
  }
);

export const createEngineerServicesSubCategories = createAsyncThunk(
  "engineerServicesSubCategories/postApi",
  async ({ req }) => {
    await axios
      .post(`${BASE_URL}/engineerservicesubcategories`, req, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getAccesToken()}`,
        },
      })
      .then(() => {
        toast.success("yaradıldı");
        window.location = `${ADMIN}/engineerservicescategory`;
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

export const updateEngineerServicesSubCategories = createAsyncThunk(
  "engineerServicesSubCategories/putApi",
  async ({ req, id }) => {
    await axios
      .put(`${BASE_URL}/engineerservicesubcategories/${id}`, req, {
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

export const deleteEngineerServicesSubCategories = createAsyncThunk(
  "engineerServicesSubCategories/deleteApi",
  async (payload) => {
    await axios
      .delete(`${BASE_URL}/engineerservicesubcategories/${payload}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getAccesToken()}`,
        },
      })
      .then(() => {
        toast.success("mühəndislik xidmətinin sub categoryası silindi");
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

const engineerServicesSubCategoriesSlice = createSlice({
  name: "engineerServicesSubCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEngineerServicesSubCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleEngineerServicesSubCategories.pending, (state) => {
        state.singleStatus = "loading";
      })
      .addCase(
        fetchEngineerServicesSubCategories.fulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.data = action.payload;
        }
      )
      .addCase(
        fetchSingleEngineerServicesSubCategories.fulfilled,
        (state, action) => {
          state.singleStatus = "succeeded";
          state.currentEngineerServicesSubCategories = action.payload;
        }
      )
      .addCase(fetchEngineerServicesSubCategories.rejected, (state, action) => {
        state.status = "faild";
        state.error = action.error.message;
        toast.error(action.error.message);
      })
      .addCase(
        fetchSingleEngineerServicesSubCategories.rejected,
        (state, action) => {
          state.singleStatus = "faild";
          state.singleError = action.error.message;
          toast.error(action.error.message);
        }
      );
  },
});

export const getAllEnginerServicesSubcategories = (state) =>
  state.engineerServicesSubCategories.data;
export const getStatus = (state) => state.engineerServicesSubCategories.status;
export const getError = (state) => state.engineerServicesSubCategories.error;
export const getSingleEnginerServicesSubcategories = (state) =>
  state.engineerServicesSubCategories.currentEngineerServicesSubCategories;
export const getSingleStatus = (state) =>
  state.engineerServicesSubCategories.singleStatus;
export const getSingleError = (state) =>
  state.engineerServicesSubCategories.singleError;

export default engineerServicesSubCategoriesSlice.reducer;
