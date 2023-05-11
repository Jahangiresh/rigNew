import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ADMIN, BASE_URL } from "../constants";
import AuthService from "../admin/services/AuthService";

const initialState = {
  data: [],
  currentPartner: {},
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

export const fetchPartners = createAsyncThunk(
  "partners/partnersFetch",
  async () => {
    const response = await axios.get(`${BASE_URL}/partners?pageSize=50`);
    return response.data;
  }
);

export const fetchSinglePartner = createAsyncThunk(
  "partner/fetchSinglePartner",
  async ({ id }) => {
    const response = await axios.get(`${BASE_URL}/partners/${id}`);
    return response.data;
  }
);

export const createPartner = createAsyncThunk(
  "partner/postApi",
  async (payload) => {
    await axios
      .post(`${BASE_URL}/partners`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getAccesToken()}`,
        },
      })
      .then(() => {
        toast.success("tərəfdaş yaradıldı");
        window.location = `${ADMIN}/partners`;
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

export const updatePartner = createAsyncThunk(
  "partner/putApi",
  async ({ req, id }) => {
    await axios
      .put(`${BASE_URL}/partners/${id}`, req, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getAccesToken()}`,
        },
      })
      .then(() => {
        toast.success("dəyişiklik yadaşa verildi");
        window.location = `${ADMIN}/partners`;
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

export const deletePartner = createAsyncThunk(
  "partner/deleteApi",
  async (payload) => {
    await axios
      .delete(`${BASE_URL}/partners/${payload}`, {
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

const partnersSlice = createSlice({
  name: "partners",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPartners.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSinglePartner.pending, (state) => {
        state.singleStatus = "loading";
      })
      .addCase(fetchPartners.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchSinglePartner.fulfilled, (state, action) => {
        state.singleStatus = "succeeded";
        state.currentPartner = action.payload;
      })
      .addCase(fetchPartners.rejected, (state, action) => {
        state.status = "faild";
        state.error = action.error.message;
      })
      .addCase(fetchSinglePartner.rejected, (state, action) => {
        state.singleStatus = "faild";
        state.singleError = action.error.message;
      });
  },
});

export const getAll = (state) => state.partners.data;
export const getSinglePartner = (state) => state.partners.currentPartner;
export const getStatus = (state) => state.partners.status;
export const getSingleStatus = (state) => state.partners.singleStatus;
export const getError = (state) => state.partners.error;
export const getSingleError = (state) => state.partners.singleError;

export default partnersSlice.reducer;
