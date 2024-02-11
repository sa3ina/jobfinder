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
    const response = await axios("http://localhost:3000/job");
    return await response.data;
  }
);
export const postJob = createAsyncThunk("user/postData", async (newJob) => {
  const posted = await axios.post(`http://localhost:3000/job/`, newJob);
  return posted.data;
});
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
  },
});

// Action creators are generated for each case reducer function
// export const { increment } = productSlice.actions;

export default JobSlice.reducer;
