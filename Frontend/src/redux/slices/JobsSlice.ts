//@ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
interface job {
  id: String;
  email: String;
  title: String;
  categories: String;
  salary: String;
  location: String;
  remote: Boolean;
  benefits: Array<String>;
  type: String;
  experience: String;
  qualification: String;
  description: String;
  companyname: String;
  companywebsite: String;
  companyemail: String;
  companycontact: String;
  companylocation: String;
  companydescription: String;
  companylogo: String;
}

interface jobState {
  jobs: job[];
  loading: boolean;
  error: string | null;
}
const initialState: jobState = {
  jobs: [],
  loading: false,
  error: null,
};

const API_URL = import.meta.env.VITE_API_URL;

export const fetchJobs = createAsyncThunk(
  "get/jobsinfo",
  async (): Promise<job[]> => {
    const response = await axios(`${API_URL}/job`);
    return await response.data;
  }
);
export const postJob = createAsyncThunk("user/postData", async (newJob) => {
  const posted = await axios.post(`${API_URL}/job/`, newJob);
  return posted.data;
});
export const deleteJob = createAsyncThunk(
  "jobs/deleteJob",
  async (jobId: string) => {
    await axios.delete(`${API_URL}/job/${jobId}`);
    return jobId;
  }
);
export const editJob = createAsyncThunk(
  "jobs/editJob",
  async (updatedJob: job) => {
    const response = await axios.patch(
      `${API_URL}/job/${updatedJob.id}`,
      updatedJob
    );
    // console.log(response.data);
    return response.data;
  }
);
export const JobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    increment: (state) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchJobs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchJobs.fulfilled, (state, action) => {
      state.jobs = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchJobs.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(postJob.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postJob.fulfilled, (state, action) => {
      state.loading = false;
      state.jobs = [...state.jobs, action.payload];
    });
    builder.addCase(postJob.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteJob.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteJob.fulfilled, (state, action) => {
      state.loading = false;
      state.jobs = state.jobs.filter((job) => job.id !== action.payload);
    });
    builder.addCase(deleteJob.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(editJob.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editJob.fulfilled, (state, action) => {
      state.loading = false;

      state.jobs = state.jobs.map((job) =>
        job.id === action.payload.id ? action.payload : job
      );
    });
    builder.addCase(editJob.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default JobSlice.reducer;
