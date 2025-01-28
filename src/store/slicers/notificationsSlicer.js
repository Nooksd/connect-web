import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { innovaApi } from "@/services/http";

export const fetchNotifications = createAsyncThunk(
  "notification/get-all",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await innovaApi.get(`/notification/get-all`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const readNotification = createAsyncThunk(
  "notification/read",
  async (notificationId, { rejectWithValue }) => {
    try {
      const { data } = await innovaApi.put(
        `/notification/read/${notificationId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const notificationsSlicer = createSlice({
  name: "notifications",
  initialState: { notifications: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notifications = action.payload.notifications;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(readNotification.pending, (state) => {
        state.status = "loading";
      })
      .addCase(readNotification.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(readNotification.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default notificationsSlicer.reducer;
