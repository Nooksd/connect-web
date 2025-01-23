import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { innovaApi } from "@/services/http";

export const fetchContacts = createAsyncThunk(
  "users/fetchAppUsers",
  async (query) => {
    const { data } = await innovaApi.get(`/users?name=${query}`);
    return data;
  }
);

const contactsSlicer = createSlice({
  name: "contacts",
  initialState: { contacts: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload)
        state.contacts = action.payload.users;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default contactsSlicer.reducer;
