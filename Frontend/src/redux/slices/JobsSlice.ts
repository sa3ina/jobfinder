import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
interface job {
  id: String;
  title: String;
  categories: String;
  company: String;
  salary: String;
  location: String;
  remote: Boolean;
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
// export const postData = createAsyncThunk("user/postData", async (newPers) => {
//   const posted = await axios.post(`http://localhost:3000/jobseeker/`, newPers);
//   return posted.data;
// });
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
    // builder.addCase(postData.pending, (state) => {
    //   state.loading = true;
    // });
    // builder.addCase(postData.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.jobseekers = [...state.jobseekers, action.payload];
    // });
    // builder.addCase(postData.rejected, (state) => {
    //   state.loading = false;
    // });
  },
});

// Action creators are generated for each case reducer function
// export const { increment } = productSlice.actions;

export default JobSlice.reducer;
