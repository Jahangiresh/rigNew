import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ADMIN, BASE_URL } from "../constants";
import toast from "react-hot-toast";
import AuthService from "../admin/services/AuthService";

const initialState = {
  data: [],
  currentEquipmentsSubCategories: {},
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

export const fetchEquipmentsSubCategories = createAsyncThunk(
  "equipmentsSubCategories/fetchEquipmentsSubCategories",
  async () => {
    const response = await axios.get(
      `${BASE_URL}/equipmentsubcategories?pageSize=50`
    );
    return response.data;
  }
);

export const fetchSingleEquipmentsSubCategories = createAsyncThunk(
  "equipmentsSubCategories/fetchSingleEquipmentsSubCategories",
  async ({ id }) => {
    const response = await axios.get(
      `${BASE_URL}/equipmentsubcategories/${id}`
    );
    return response.data;
  }
);

export const createEquipmentsSubCategories = createAsyncThunk(
  "equipmentsSubCategories/postApi",
  async ({ req }) => {
    await axios
      .post(`${BASE_URL}/equipmentsubcategories`, req, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getAccesToken()}`,
        },
      })
      .then(() => {
        toast.success("yaradıldı");
        window.location = `${ADMIN}/equipmentscategory`;
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

export const updateEquipmentsSubCategories = createAsyncThunk(
  "equipmentsSubCategories/putApi",
  async ({ req, id }) => {
    await axios
      .put(`${BASE_URL}/equipmentsubcategories/${id}`, req, {
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

export const deleteEquipmentsSubCategories = createAsyncThunk(
  "equipmentsSubCategories/deleteApi",
  async (payload) => {
    await axios
      .delete(`${BASE_URL}/equipmentsubcategories/${payload}`, {
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

const equipmentsSubCategoriesSlice = createSlice({
  name: "equipmentsSubCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEquipmentsSubCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleEquipmentsSubCategories.pending, (state) => {
        state.singleStatus = "loading";
      })
      .addCase(fetchEquipmentsSubCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(
        fetchSingleEquipmentsSubCategories.fulfilled,
        (state, action) => {
          state.singleStatus = "succeeded";
          state.currentEquipmentsSubCategories = action.payload;
        }
      )
      .addCase(fetchEquipmentsSubCategories.rejected, (state, action) => {
        state.status = "faild";
        state.error = action.error.message;
        toast.error(action.error.message);
      })
      .addCase(fetchSingleEquipmentsSubCategories.rejected, (state, action) => {
        state.singleStatus = "faild";
        state.singleError = action.error.message;
        toast.error(action.error.message);
      });
  },
});

export const getAllEquipmentsSubcategories = (state) =>
  state.equipmentsSubCategories.data;
export const getStatus = (state) => state.equipmentsSubCategories.status;
export const getError = (state) => state.equipmentsSubCategories.error;
export const getSingleEquipmentsSubcategories = (state) =>
  state.equipmentsSubCategories.currentEquipmentsSubCategories;
export const getSingleStatus = (state) =>
  state.equipmentsSubCategories.singleStatus;
export const getSingleError = (state) =>
  state.equipmentsSubCategories.singleError;

export default equipmentsSubCategoriesSlice.reducer;
