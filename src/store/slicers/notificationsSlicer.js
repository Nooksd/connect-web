import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { innovaApi } from "@/services/http";

export const fetchCotifications = createAsyncThunk(
  "notification/get-all",
  async () => {
    const { data } = await innovaApi.get(`/notification/get-all`);
    return data;
  }
);

const notificationsSlicer = createSlice({
  name: "notifications",
  initialState: { notifications: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCotifications.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCotifications.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload)
        state.notifications = action.payload.notifications;
      })
      .addCase(fetchCotifications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default notificationsSlicer.reducer;
