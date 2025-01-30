import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { innovaApi } from "@/services/http";

export const createUser = createAsyncThunk(
  "user/create",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await innovaApi.get(`/user/create`, user);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/delete",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await innovaApi.delete(`/user/delete/${userId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/update",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await innovaApi.put(`/user/update/${body.uid}`, body.user);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const admSlicer = createSlice({
  name: "adm",
  initialState: { validations: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {

  },
});

export default admSlicer.reducer;
