import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { innovaApi } from "@/services/http";

export const fetchPosts = createAsyncThunk(
  "posts/get-all",
  async (pageIndex, { rejectWithValue }) => {
    try {
      const { data } = await innovaApi.get(`/post/get?page=${pageIndex}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPost = createAsyncThunk(
  "posts/get",
  async (postId, { rejectWithValue }) => {
    try {
      const { data } = await innovaApi.get(`/post/get/${postId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/create",
  async (post, { rejectWithValue }) => {
    try {
      const { data } = await innovaApi.post(`/post/create`, post);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/delete",
  async (postId, { rejectWithValue }) => {
    try {
      const { data } = await innovaApi.delete(`/post/delete/${postId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const likePost = createAsyncThunk(
  "posts/like",
  async (postId, { rejectWithValue }) => {
    try {
      const { data } = await innovaApi.post(`/post/like/${postId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const dislikePost = createAsyncThunk(
  "posts/dislike",
  async (postId, { rejectWithValue }) => {
    try {
      const { data } = await innovaApi.post(`/post/dislike/${postId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const commentPost = createAsyncThunk(
  "posts/comment",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await innovaApi.post(
        `/post/comment/${body.postId}`,
        body.comment
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "posts/deleteComment",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await innovaApi.delete(
        `/post/comment/delete/${body.postId}/${body.commentId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const postsSlicer = createSlice({
  name: "posts",
  initialState: { posts: [], post: {}, status: "idle", error: null },
  reducers: {
    updatePosts: (state, action) => {
      state.posts = action.payload;
    },
    updatePost: (state, action) => {
      state.post = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
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
      .addCase(dislikePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(dislikePost.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(dislikePost.rejected, (state, action) => {
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

export const { updatePosts, updatePost } = postsSlicer.actions;
export default postsSlicer.reducer;
