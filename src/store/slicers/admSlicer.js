import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { innovaApi } from "@/services/http";

export const createUser = createAsyncThunk(
  "user/create",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await innovaApi.post(`/user/create`, user);
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
      const { data } = await innovaApi.put(
        `/user/update/${body.uid}`,
        body.user
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createMission = createAsyncThunk(
  "mission/create",
  async (mission, { rejectWithValue }) => {
    try {
      const { data } = await innovaApi.post(`/mission/create`, mission);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteMission = createAsyncThunk(
  "mission/delete",
  async (missionId, { rejectWithValue }) => {
    try {
      const { data } = await innovaApi.delete(`/mission/delete/${missionId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const forceCompleteMission = createAsyncThunk(
  "mission/force-complete",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await innovaApi.post(
        `/mission/complete/${body.missionId}/${body.userId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchValidations = createAsyncThunk(
  "/validation/get-pending",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await innovaApi.get(`/validation/get-pending`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const acceptValidation = createAsyncThunk(
  "validation/accept",
  async (validationId, { rejectWithValue }) => {
    try {
      const { data } = await innovaApi.put(
        `/validation/accept/${validationId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const rejectValidation = createAsyncThunk(
  "validation/reject",
  async (validationId, { rejectWithValue }) => {
    try {
      const { data } = await innovaApi.put(
        `/validation/reject/${validationId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const admSlicer = createSlice({
  name: "adm",
  initialState: { validations: [], status: "idle", error: null },
  reducers: {
    updateValidations: (state, action) => {
      state.validations = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchValidations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchValidations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.validations = action.payload.validations;
      })
      .addCase(fetchValidations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { updateValidations } = admSlicer.actions;
export default admSlicer.reducer;
