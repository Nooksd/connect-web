import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { innovaApi } from "@/services/http";

export const postImage = createAsyncThunk(
  "image/post",
  async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const { data } = await innovaApi.post(`/post/image/upload`, formData);
    return data;
  }
);

export const postAvatar = createAsyncThunk(
  "avatar/post",
  async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);
    const { data } = await innovaApi.post(`/avatar/upload`, formData);
    return data;
  }
);

const imageSlicer = createSlice({
  name: "image",
  initialState: { status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postAvatar.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postAvatar.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload)
      })
      .addCase(postAvatar.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(postImage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postImage.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload)
      })
      .addCase(postImage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default imageSlicer.reducer;
