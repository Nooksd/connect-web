import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { innovaApi } from "@/services/http";

export const fetchBirthdays = createAsyncThunk(
  "/users/birthdays",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await innovaApi.get(`/users/birthdays`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const birthdaysSlicer = createSlice({
  name: "birthdays",
  initialState: { birthdays: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBirthdays.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBirthdays.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.birthdays = action.payload.birthdays;
      })
      .addCase(fetchBirthdays.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default birthdaysSlicer.reducer;
