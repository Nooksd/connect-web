import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { innovaApi } from "@/services/http";

export const uploadImage = createAsyncThunk(
  "image/post",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const { data } = await innovaApi.post(`/post/image/upload`, formData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const uploadAvatar = createAsyncThunk(
  "avatar/post",
  async ({file, userId}, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const { data } = await innovaApi.post(`/avatar/upload/${userId}`, formData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const imageSlicer = createSlice({
  name: "image",
  initialState: { status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadAvatar.pending, (state) => {
        state.status = "loading";
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(uploadImage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default imageSlicer.reducer;
