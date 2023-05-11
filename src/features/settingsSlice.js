import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, ADMIN } from "../constants";
import { toast } from "react-hot-toast";
import AuthService from "../admin/services/AuthService";

const initialState = {
  data: [],
  currentSetting: {},
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

export const fetchSettings = createAsyncThunk(
  "settings/fetchSettings",
  async () => {
    const response = await axios.get(`${BASE_URL}/settings?pageSize=1000`);
    return response;
  }
);

export const fetchSingleSettings = createAsyncThunk(
  "settings/fetchSingleSettings",
  async ({ id }) => {
    const response = await axios.get(`${BASE_URL}/settings/${id}`);
    return response.data;
  }
);

export const createSettings = createAsyncThunk(
  "settings/postApi",
  async (payload) => {
    await axios
      .post(`${BASE_URL}/settings`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getAccesToken()}`,
        },
      })
      .then(() => {
        toast.success("yaradıldı");
        window.location = `${ADMIN}/setting`;
      })
      .catch(async (err) => {
        if (err.response.status === 401) {
          await AuthService.refreshToken();
        }
        if (err.response.data.title) {
          toast.error(err.response.data.title);
        }
        Object.keys(err.response.data.errors).forEach((key) => {
          toast.error(err.response.data.errors[key]);
        });
      });
  }
);

export const updateSettings = createAsyncThunk(
  "settings/putApi",
  async ({ req, id }) => {
    await axios
      .put(`${BASE_URL}/settings/${id}`, req, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getAccesToken()}`,
        },
      })
      .then(() => {
        toast.success("dəyişiklik yadaşa verildi");
        window.location = `${ADMIN}/setting`;
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

export const deleteSettings = createAsyncThunk(
  "settings/deleteApi",
  async (payload) => {
    await axios
      .delete(`${BASE_URL}/settings/${payload}`, {
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

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleSettings.pending, (state) => {
        state.singleStatus = "loading";
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { data } = action.payload;
        state.data = data;
      })
      .addCase(fetchSingleSettings.fulfilled, (state, action) => {
        state.singleStatus = "succeeded";
        state.currentSetting = action.payload;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error(action.error.message);
      })
      .addCase(fetchSingleSettings.rejected, (state, action) => {
        state.singleStatus = "failed";
        state.singleError = action.error;
        toast.error(action.error.message);
      });
  },
});

export const getAllSettings = (state) => state.settings.data;
export const getSingleSettings = (state) => state.settings.currentSetting;
export const getStatus = (state) => state.settings.status;
export const getSingleStatus = (state) => state.settings.singleStatus;
export const getSingleError = (state) => state.settings.singleError;
export const getError = (state) => state.settings.error;

export default settingsSlice.reducer;
