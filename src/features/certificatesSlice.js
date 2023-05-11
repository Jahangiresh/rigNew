import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, ADMIN } from "../constants";
import { toast } from "react-hot-toast";
import AuthService from "../admin/services/AuthService";

const initialState = {
  data: [],
  currentCertificate: {},
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

export const fetchCertificates = createAsyncThunk(
  "certificates/fetchCertificates",
  async ({ fin, pageNumber }) => {
    const response = await axios
      .get(
        `${BASE_URL}/certificates?${
          fin ? `fIN=${fin}&` : "?"
        }pageNumber=${pageNumber}&pageSize=6&orderByProperty=Id&isDesc=true`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getAccesToken()}`,
          },
        }
      )
      .catch(async (err) => {
        if (err.response.status === 401) {
          await AuthService.refreshToken();
        }
      });
    return response;
  }
);

export const fetchSingleCertificate = createAsyncThunk(
  "certificates/fetchSingleCertificates",
  async ({ id }) => {
    const response = await axios
      .get(`${BASE_URL}/certificates/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
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

export const createCertificate = createAsyncThunk(
  "certificates/postApi",
  async (payload) => {
    await axios
      .post(`${BASE_URL}/certificates`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getAccesToken()}`,
        },
      })
      .then(() => {
        toast.success("yaradıldı");
        window.location = `${ADMIN}/certificates`;
      })
      .catch(async (err) => {
        if (err.response.status === 401) {
          await AuthService.refreshToken();
        }
        toast.error(err.response.title);
        Object.keys(err.response.data.errors).forEach((key) => {
          toast.error(err.response.data.errors[key]);
        });
      });
  }
);

export const updateCertificate = createAsyncThunk(
  "certificates/putApi",
  async ({ req, id }) => {
    await axios
      .put(`${BASE_URL}/certificates/${id}`, req, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getAccesToken()}`,
        },
      })
      .then(() => {
        toast.success("dəyişiklik yadaşa verildi");
        window.location = `${ADMIN}/certificates`;
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

export const deleteCertificate = createAsyncThunk(
  "certificates/deleteApi",
  async (payload) => {
    await axios
      .delete(`${BASE_URL}/certificates/${payload}`, {
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

const certificatesSlice = createSlice({
  name: "certificates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCertificates.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleCertificate.pending, (state) => {
        state.singleStatus = "loading";
      })
      .addCase(fetchCertificates.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { data } = action.payload;
        state.data = data;
        const pagination = action.payload.headers["x-pagination"];
        state.pagination = JSON.parse(pagination);
      })
      .addCase(fetchSingleCertificate.fulfilled, (state, action) => {
        state.singleStatus = "succeeded";
        state.currentCertificate = action.payload;
      })
      .addCase(fetchCertificates.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error(action.error.message);
      })
      .addCase(fetchSingleCertificate.rejected, (state, action) => {
        state.singleStatus = "failed";
        state.singleError = action.error;
        toast.error(action.error.message);
      });
  },
});

export const getAllCertificates = (state) => state.certificates.data;
export const getSingleCertificates = (state) =>
  state.certificates.currentCertificate;
export const getStatus = (state) => state.certificates.status;
export const getSingleStatus = (state) => state.certificates.singleStatus;
export const getSingleError = (state) => state.certificates.singleError;
export const getPagination = (state) => state.certificates.pagination;
export const getError = (state) => state.certificates.error;

export default certificatesSlice.reducer;
