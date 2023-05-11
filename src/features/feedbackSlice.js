import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../constants";

const initialState = {
  data: [],
  status: "idle",
  error: "null",
};

export const fetchFeedback = createAsyncThunk(
  "feedback/feedbackFetch",
  async () => {
    const response = await axios.get(`${BASE_URL}/customercomments`);
    return response.data;
  }
);

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedback.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFeedback.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchFeedback.rejected, (state, action) => {
        state.status = "faild";
        state.error = action.error.message;
      });
  },
});

export const getAll = (state) => state.feedback.data;
export const getStatus = (state) => state.feedback.status;
export const getError = (state) => state.feedback.error;
export default feedbackSlice.reducer;
