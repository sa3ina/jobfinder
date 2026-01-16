//@ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
interface comment {
  id: String;
  fullname: String;
  rating: Number;
  comment: String;
}

interface commentState {
  comments: comment[];
  loading: boolean;
  error: string | null;
}
const initialState: commentState = {
  comments: [],
  loading: false,
  error: null,
};

const API_URL = import.meta.env.VITE_API_URL;

export const fetchComment = createAsyncThunk(
  "get/commentinfo",
  async (): Promise<comment[]> => {
    const response = await axios.get(`${API_URL}/comment/`);
    return await response.data;
  }
);
export const postComment = createAsyncThunk(
  "user/postComment",
  async (newComment) => {
    const posted = await axios.post(`${API_URL}/comment/`, newComment);
    return posted.data;
  }
);
export const CommentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchComment.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchComment.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(postComment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postComment.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = [...state.comments, action.payload];
    });
    builder.addCase(postComment.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default CommentSlice.reducer;
