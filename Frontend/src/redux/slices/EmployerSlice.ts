import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
interface employer {
  id: String;
  firstname: String;
  lastname: String;
  email: String;
  password: String;
  notifications: Array<Object>;
}

interface employerState {
  employers: employer[];
  loading: boolean;
  error: string | null;
}
const initialState: employerState = {
  employers: [],
  loading: false,
  error: null,
};
export const fetchDataa = createAsyncThunk(
  "get/employerinfo",
  async (): Promise<employer[]> => {
    const response = await axios("http://localhost:3000/employer");
    return await response.data;
  }
);
export const postData = createAsyncThunk("user/postData", async (newEmp) => {
  const posted = await axios.post(`http://localhost:3000/employer/`, newEmp);
  return posted.data;
});
import { RootState } from "../store";

export const applyForJob = createAsyncThunk(
  "employers/applyforjob",
  async (payload) => {
    try {
      const employers = await axios.get("http://localhost:3000/employer");
      console.log("employers", employers.data);
      const updatedEmployers = employers.data.map((employer) => {
        console.log(payload.employerEmail);
        if (employer.email === payload.employerEmail) {
          return {
            ...employer,
            notifications: [
              ...employer.notifications,
              {
                jobId: payload.jobId,
                jobSeekerEmail: payload.jobSeekerEmail,
                status: "pending",
              },
            ],
          };
        }
        return employer;
      });
      await Promise.all(
        updatedEmployers.map(async (employer) => {
          await axios.patch(`http://localhost:3000/employer/${employer.id}`, {
            notifications: employer.notifications,
          });
        })
      );
      console.log("updatedEmployers", updatedEmployers);
      return updatedEmployers;
    } catch (error) {
      throw new Error("Failed to apply for job");
    }
  }
);

export const EmployerSlice = createSlice({
  name: "employers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDataa.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDataa.fulfilled, (state, action) => {
      state.employers = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchDataa.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(postData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postData.fulfilled, (state, action) => {
      state.loading = false;
      state.employers = [...state.employers, action.payload];
    });
    builder
      .addCase(postData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(applyForJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(applyForJob.fulfilled, (state, action) => {
        state.loading = false;
        state.employers = action.payload;
      })
      .addCase(applyForJob.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Action creators are generated for each case reducer function
// export const { increment } = productSlice.actions;

export default EmployerSlice.reducer;
