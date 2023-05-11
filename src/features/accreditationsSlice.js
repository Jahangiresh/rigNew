import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ADMIN, BASE_URL } from "../constants";
import AuthService from "../admin/services/AuthService";

const initialState = {
  data: [],
  currentAccreditation: {},
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

export const fetchAccreditations = createAsyncThunk(
  "accreditations/accreditationsFetch",
  async () => {
    const response = await axios.get(
      `${BASE_URL}/accreditations?pageSize=50&orderByProperty=Id&isDesc=true`
    );
    return response.data;
  }
);

export const fetchSingleAccreditation = createAsyncThunk(
  "accreditation/fetchSingleAccreditation",
  async ({ id }) => {
    const response = await axios.get(`${BASE_URL}/accreditations/${id}`);
    return response.data;
  }
);

export const createAccreditation = createAsyncThunk(
  "accreditation/postApi",
  async (payload) => {
    await axios
      .post(`${BASE_URL}/accreditations`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getAccesToken()}`,
        },
      })
      .then(() => {
        toast.success("akkreditasiya yaradıldı");
        window.location = `${ADMIN}/accreditations`;
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

export const updateAccreditation = createAsyncThunk(
  "accreditation/putApi",
  async ({ req, id }) => {
    await axios
      .put(`${BASE_URL}/accreditations/${id}`, req, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getAccesToken()}`,
        },
      })
      .then(() => {
        toast.success("dəyişiklik yadaşa verildi");
        window.location = `${ADMIN}/accreditations`;
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

export const deleteAccreditation = createAsyncThunk(
  "accreditation/deleteApi",
  async (payload) => {
    await axios
      .delete(`${BASE_URL}/accreditations/${payload}`, {
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

const accreditationsSlice = createSlice({
  name: "accreditations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccreditations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleAccreditation.pending, (state) => {
        state.singleStatus = "loading";
      })
      .addCase(fetchAccreditations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchSingleAccreditation.fulfilled, (state, action) => {
        state.singleStatus = "succeeded";
        state.currentAccreditation = action.payload;
      })
      .addCase(fetchAccreditations.rejected, (state, action) => {
        state.status = "faild";
        state.error = action.error.message;
      })
      .addCase(fetchSingleAccreditation.rejected, (state, action) => {
        state.singleStatus = "faild";
        state.singleError = action.error.message;
      });
  },
});

export const getAll = (state) => state.accreditations.data;
export const getSingleAccreditation = (state) =>
  state.accreditations.currentAccreditation;
export const getStatus = (state) => state.accreditations.status;
export const getSingleStatus = (state) => state.accreditations.singleStatus;
export const getError = (state) => state.accreditations.error;
export const getSingleError = (state) => state.accreditations.singleError;
export const { setState } = accreditationsSlice.actions;
export default accreditationsSlice.reducer;
