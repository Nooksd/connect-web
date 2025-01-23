import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { innovaApi } from "@/services/http";

export const fetchMissions = createAsyncThunk(
  "mission/get-all",
  async () => {
    const { data } = await innovaApi.get(`/mission/get-all`);
    return data;
  }
);

export const verifyCompletion = createAsyncThunk(
  "mission/verify-completion",
  async (missionId) => {
    const { data } = await innovaApi.post(`/mission/verify-completion/${missionId}`);
    return data;
  }
)

const missionsSlicer = createSlice({
  name: "missions",
  initialState: { missions: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMissions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMissions.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload)
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
        console.log(action.payload)
      })
      .addCase(verifyCompletion.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default missionsSlicer.reducer;
