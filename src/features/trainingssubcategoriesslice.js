import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ADMIN, BASE_URL } from "../constants";
import toast from "react-hot-toast";
import AuthService from "../admin/services/AuthService";

const initialState = {
  data: [],
  currentTrainingsSubCategories: {},
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

export const fetchTrainingsSubCategories = createAsyncThunk(
  "trainingsSubCategories/fetchTrainingsSubCategories",
  async ({ categoryId }) => {
    const response = await axios.get(
      `${BASE_URL}/educationsubcategories?educationCategoryId=${categoryId}&pageSize=50`
    );
    return response.data;
  }
);

export const fetchSingleTrainingsSubCategories = createAsyncThunk(
  "trainingsSubCategories/fetchSingleTrainingsSubCategories",
  async ({ id }) => {
    const response = await axios.get(
      `${BASE_URL}/educationsubcategories/${id}`
    );
    return response.data;
  }
);

export const createTrainingsSubCategories = createAsyncThunk(
  "trainingsSubCategories/postApi",
  async ({ req, id }) => {
    await axios
      .post(`${BASE_URL}/educationsubcategories`, req, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getAccesToken()}`,
        },
      })
      .then(() => {
        toast.success("təlimin sub categoryası yaradıldı");
        window.location = `${ADMIN}/trainingscategory/${id}`;
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

export const updateTrainingsSubCategories = createAsyncThunk(
  "trainingsSubCategories/putApi",
  async ({ req, id }) => {
    await axios
      .put(`${BASE_URL}/educationsubcategories/${id}`, req, {
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

export const deleteTrainingsSubCategories = createAsyncThunk(
  "trainingsSubCategories/deleteApi",
  async (payload) => {
    await axios
      .delete(`${BASE_URL}/educationsubcategories/${payload}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getAccesToken()}`,
        },
      })
      .then(() => {
        toast.success("təlimin sub categoryası silindi");
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

const trainingsSubCategoriesSlice = createSlice({
  name: "trainingsSubCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrainingsSubCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleTrainingsSubCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTrainingsSubCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchSingleTrainingsSubCategories.fulfilled, (state, action) => {
        state.singleStatus = "succeeded";
        state.currentTrainingsSubCategories = action.payload;
      })
      .addCase(fetchTrainingsSubCategories.rejected, (state, action) => {
        state.status = "faild";
        state.error = action.error.message;
        toast.error(action.error.message);
      })
      .addCase(fetchSingleTrainingsSubCategories.rejected, (state, action) => {
        state.singleStatus = "faild";
        state.singleError = action.error.message;
        toast.error(action.error.message);
      });
  },
});

export const getAllTrainingsSubcategories = (state) =>
  state.trainingsSubcategories.data;
export const getStatus = (state) => state.trainingsSubcategories.status;
export const getError = (state) => state.trainingsSubcategories.error;
export const getSingleTrainingsSubcategories = (state) =>
  state.trainingsSubcategories.currentTrainingsSubCategories;
export const getSingleStatus = (state) =>
  state.trainingsSubcategories.singleStatus;
export const getSingleError = (state) =>
  state.trainingsSubcategories.singleError;

export default trainingsSubCategoriesSlice.reducer;
