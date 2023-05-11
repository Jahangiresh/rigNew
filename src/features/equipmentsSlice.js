import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../constants";
import { toast } from "react-hot-toast";
import AuthService from "../admin/services/AuthService";

const initialState = {
  data: [],
  currentEquipment: {},
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

export const fetchEquipments = createAsyncThunk(
  "equipments/fetchEquipments",
  async ({ search, pageNumber, sub }) => {
    const response = await axios.get(
      `${BASE_URL}/equipments${search ? `?title=${search}&` : "?"}${
        sub ? `equipmentSubcategoryId=${sub}&` : ""
      }${pageNumber ? `pageNumber=${pageNumber}` : ""}&pageSize=6`
    );
    return response;
  }
);

export const fetchSingleEquipment = createAsyncThunk(
  "equipments/fetchSingleEquipment",
  async ({ id }) => {
    const response = await axios.get(`${BASE_URL}/equipments/${id}`);
    return response.data;
  }
);

export const createEquipment = createAsyncThunk(
  "equipments/postApi",
  async (payload) => {
    await axios
      .post(`${BASE_URL}/equipments`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getAccesToken()}`,
        },
      })
      .then((res) => {
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

export const updateEquipment = createAsyncThunk(
  "equipments/putApi",
  async ({ req, id }) => {
    await axios
      .put(`${BASE_URL}/equipments/${id}`, req, {
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

export const deleteEquipment = createAsyncThunk(
  "equipments/deleteApi",
  async (payload) => {
    await axios
      .delete(`${BASE_URL}/equipments/${payload}`, {
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

const equipmentsSlice = createSlice({
  name: "equipments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEquipments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleEquipment.pending, (state) => {
        state.singleStatus = "loading";
      })
      .addCase(fetchEquipments.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { data, headers } = action.payload;
        state.data = data;
        state.pagination = JSON.parse(headers["x-pagination"]);
      })
      .addCase(fetchSingleEquipment.fulfilled, (state, action) => {
        state.singleStatus = "succeeded";
        state.currentEquipment = action.payload;
      })
      .addCase(fetchEquipments.rejected, (state, action) => {
        state.status = "faild";
        state.error = action.error.message;
      })
      .addCase(fetchSingleEquipment.rejected, (state, action) => {
        state.singleStatus = "faild";
        state.singleError = action.error.message;
      });
  },
});

export const getAllEquipments = (state) => state.equipments.data;
export const getEquipmentsPagination = (state) => state.equipments.pagination;
export const getEquipmentsStatus = (state) => state.equipments.status;
export const getEquipmentsError = (state) => state.equipments.error;
export const getSingleEquipments = (state) => state.equipments.currentEquipment;
export const getSingleStatus = (state) => state.equipments.singleStatus;
export const getSingleError = (state) => state.equipments.singleError;

export default equipmentsSlice.reducer;
