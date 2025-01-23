import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { innovaApi } from "@/services/http";

export const fetchPosts = createAsyncThunk(
  "posts/get-all",
  async (pageIndex) => {
    const { data } = await innovaApi.get(`/post/get?page=${pageIndex}`);
    return data;
  }
);

export const fetchPost = createAsyncThunk(
  "posts/get", 
  async (postId) => {
    const { data } = await innovaApi.get(`/post/get/${postId}`);
    return data;
  }
);

export const createPost = createAsyncThunk(
  "posts/create",
  async (post) => {
    const { data } = await innovaApi.post(`/post/create`, post);
    return data;
  }
)

export const deletePost = createAsyncThunk(
  "posts/delete",
  async (postId) => {
    const { data } = await innovaApi.delete(`/post/delete/${postId}`);
    return data;
  }
)

export const likePost = createAsyncThunk(
  "posts/like",
  async (postId) => {
    const { data } = await innovaApi.post(`/post/like/${postId}`);
    return data;
  }
)

export const unlikePost = createAsyncThunk(
  "posts/unlike",
  async (postId) => {
    const { data } = await innovaApi.post(`/post/unlike/${postId}`);
    return data;
  }
)

export const commentPost = createAsyncThunk(
  "posts/comment",
  async (data) => {
    const { data } = await innovaApi.post(`/post/comment${data.postId}`, data.comment);
    return data;
  }
)

export const deleteComment = createAsyncThunk(
  "posts/deleteComment",
  async (data) => {
    const { data } = await innovaApi.delete(`/post/comment/delete/${data.postId}/${data.commentId}`);
    return data;
  }
)

const postsSlicer = createSlice({
  name: "posts",
  initialState: { posts: [], post: {}, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload)
        state.posts = action.payload.posts;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(fetchPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.post = action.payload.post;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(createPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPost.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(deletePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePost.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(likePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(likePost.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(likePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(unlikePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(unlikePost.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(unlikePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(commentPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(commentPost.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(commentPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(deleteComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteComment.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default postsSlicer.reducer;
