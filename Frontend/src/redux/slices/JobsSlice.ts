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
export const fetchJobs = createAsyncThunk(
  "get/jobsinfo",
  async (): Promise<job[]> => {
    const response = await axios("https://jobfinder-4jwl.onrender.com/job");
    return await response.data;
  }
);
export const postJob = createAsyncThunk("user/postData", async (newJob) => {
  const posted = await axios.post(
    `https://jobfinder-4jwl.onrender.com/job/`,
    newJob
  );
  return posted.data;
});
export const deleteJob = createAsyncThunk(
  "jobs/deleteJob",
  async (jobId: string) => {
    await axios.delete(`https://jobfinder-4jwl.onrender.com/job/${jobId}`);
    return jobId;
  }
);
export const editJob = createAsyncThunk(
  "jobs/editJob",
  async (updatedJob: job) => {
    const response = await axios.patch(
      `https://jobfinder-4jwl.onrender.com/job/${updatedJob.id}`,
      updatedJob
    );
    console.log(response.data);
    return response.data;
  }
);
export const JobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
    },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
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

// Action creators are generated for each case reducer function
// export const { increment } = productSlice.actions;

export default JobSlice.reducer;
