import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { innovaApi } from "@/services/http";

export const fetchMissions = createAsyncThunk(
  "mission/current",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await innovaApi.get(`/mission/get-current`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const verifyCompletion = createAsyncThunk(
  "mission/verify-completion",
  async (missionId, { rejectWithValue }) => {
    try {
      const { data } = await innovaApi.get(
        `/mission/verify-completion/${missionId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const validationCreate = createAsyncThunk(
  "validation/create",
  async (body, { rejectWithValue }) => {
    try {
      console.log(body);
      const { data } = await innovaApi.post(`/validation/create`, body);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const missionsSlicer = createSlice({
  name: "missions",
  initialState: { missions: [], status: "idle", error: null },
  reducers: {
    updateMissions(state, action) {
      state.missions = action.payload.missions;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMissions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMissions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.missions = action.payload.missions;
      })
      .addCase(fetchMissions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(verifyCompletion.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verifyCompletion.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(verifyCompletion.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

      builder
      .addCase(validationCreate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(validationCreate.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(validationCreate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

  },
});

export const { updateMissions } = missionsSlicer.actions;
export default missionsSlicer.reducer;
