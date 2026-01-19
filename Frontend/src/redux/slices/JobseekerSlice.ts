//@ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
interface jobseeker {
  id: String;
  firstname: String;
  lastname: String;
  email: String;
  education: String;
  desiredjob: Array<String>;
  city: String;
  jobpreference: String;
  remote: Boolean;
  about: String;
  experience: String;
  cv: String;
}

interface jobseekerState {
  jobseekers: jobseeker[];
  loading: boolean;
  error: string | null;
}
const initialState: jobseekerState = {
  jobseekers: [],
  loading: false,
  error: null,
};

const API_URL = import.meta.env.VITE_API_URL;

export const fetchData = createAsyncThunk(
  "get/jobseekerinfo",
  async (): Promise<jobseeker[]> => {
    const response = await axios.get(`${API_URL}/jobseeker`);
    return await response.data;
  }
);

export const postData = createAsyncThunk("user/postData", async (newPers) => {
  const posted = await axios.post(`${API_URL}/jobseeker/`, newPers);
  return posted.data;
});

export const JobseekerSlice = createSlice({
  name: "jobseekers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.jobseekers = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchData.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(postData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postData.fulfilled, (state, action) => {
      state.loading = false;
      state.jobseekers = [...state.jobseekers, action.payload];
    });
    builder.addCase(postData.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default JobseekerSlice.reducer;
