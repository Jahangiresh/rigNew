import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ADMIN, BASE_URL } from "../constants";
import AuthService from "../admin/services/AuthService";

const initialState = {
  slides: [],
  status: null,
  isDeleting: false,
};

const getAccesToken = () => {
  const { accessToken } = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";
  return accessToken;
};

export const slideFetch = createAsyncThunk("slides/slideFetch", async () => {
  const resp = await axios.get(`${BASE_URL}/sliders`);
  return resp?.data;
});

export const deleteSlide = createAsyncThunk(
  "slides/deleteApi",
  async (payload) => {
    const response = await axios
      .delete(`${BASE_URL}/sliders/${payload}`, {
        headers: {
          Authorization: `Bearer ${getAccesToken()}`,
        },
      })
      .catch(async (err) => {
        if (err.response.status === 401) {
          await AuthService.refreshToken();
        }
        Object.keys(err.response.data.errors).forEach((key) => {
          toast.error(err.response.data.errors[key]);
        });
      });
    return response?.data;
  }
);

export const createSlide = createAsyncThunk(
  "slides/postApi",
  async (payload) => {
    const response = await axios
      .post(`${BASE_URL}/sliders`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getAccesToken()}`,
        },
      })
      .then(() => {
        toast.success("slayd yaradıldı");
        window.location = `${ADMIN}/slides`;
      })
      .catch(async (err) => {
        if (err.response.status === 401) {
          await AuthService.refreshToken();
        }
        toast.error(err.response.data?.title);
        Object.keys(err.response.data.errors).forEach((key) => {
          toast.error(err.response.data.errors[key]);
        });
      });
    return response.data;
  }
);

const slideSlice = createSlice({
  name: "slides",
  initialState,
  reducers: {},
  extraReducers: {
    [slideFetch.pending]: (state) => {
      state.status = "pending";
    },
    [slideFetch.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.slides = action.payload;
    },
    [slideFetch.rejected]: (state) => {
      state.status = "faild";
    },
  },
});

export const getAllSlides = (state) => state.slides.slides;
export const getStatus = (state) => state.slides.status;
export const getIsDeleting = (state) => state.slides.isDeleting;

export default slideSlice.reducer;
