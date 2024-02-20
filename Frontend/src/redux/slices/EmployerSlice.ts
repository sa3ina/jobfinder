import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
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
                date: new Date(),
                id: uuidv4(),
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
export const askForInterview = createAsyncThunk(
  "employers/ask",
  async (payload) => {
    try {
      console.log("Payload:", payload); // Log the payload

      const employers = await axios.get("http://localhost:3000/employer");

      const updatedEmployers = employers.data.map((employer) => {
        console.log("Employer:", employer); // Log the current employer
        if (employer.email === payload.employerEmail) {
          const updatedNotifications = employer.notifications.map(
            (notification) => {
              console.log("Notification:", notification); // Log the current notification
              if (
                notification.jobId === payload.jobId &&
                notification.jobSeekerEmail === payload.jobSeekerEmail
              ) {
                return {
                  ...notification,
                  status: "interview",
                };
              }
              return notification;
            }
          );
          return {
            ...employer,
            notifications: updatedNotifications,
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
      return updatedEmployers;
    } catch (error) {
      throw new Error("Failed to apply for job");
    }
  }
);
export const rejectJobseeker = createAsyncThunk(
  "employers/reject",
  async (payload) => {
    try {
      console.log("Payload:", payload); // Log the payload

      const employers = await axios.get("http://localhost:3000/employer");

      const updatedEmployers = employers.data.map((employer) => {
        console.log("Employer:", employer); // Log the current employer
        if (employer.email === payload.employerEmail) {
          const updatedNotifications = employer.notifications.map(
            (notification) => {
              console.log("Notification:", notification); // Log the current notification
              if (
                notification.jobId === payload.jobId &&
                notification.jobSeekerEmail === payload.jobSeekerEmail
              ) {
                return {
                  ...notification,
                  status: "rejected",
                };
              }
              return notification;
            }
          );
          return {
            ...employer,
            notifications: updatedNotifications,
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
      return updatedEmployers;
    } catch (error) {
      throw new Error("Failed to apply for job");
    }
  }
);
export const hireJobseeker = createAsyncThunk(
  "employers/hire",
  async (payload) => {
    try {
      console.log("Payload:", payload);

      const employers = await axios.get("http://localhost:3000/employer");

      const updatedEmployers = employers.data.map((employer) => {
        console.log("Employer:", employer);
        if (employer.email === payload.employerEmail) {
          const updatedNotifications = employer.notifications.map(
            (notification) => {
              console.log("Notification:", notification);
              if (
                notification.jobId === payload.jobId &&
                notification.jobSeekerEmail === payload.jobSeekerEmail
              ) {
                return {
                  ...notification,
                  status: "hired",
                };
              }
              return notification;
            }
          );
          return {
            ...employer,
            notifications: updatedNotifications,
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
      })
      .addCase(askForInterview.pending, (state) => {
        state.loading = true;
      })
      .addCase(askForInterview.fulfilled, (state, action) => {
        state.loading = false;
        state.employers = action.payload;
      })
      .addCase(askForInterview.rejected, (state) => {
        state.loading = false;
      })
      .addCase(rejectJobseeker.pending, (state) => {
        state.loading = true;
      })
      .addCase(rejectJobseeker.fulfilled, (state, action) => {
        state.loading = false;
        state.employers = action.payload;
      })
      .addCase(rejectJobseeker.rejected, (state) => {
        state.loading = false;
      })
      .addCase(hireJobseeker.pending, (state) => {
        state.loading = true;
      })
      .addCase(hireJobseeker.fulfilled, (state, action) => {
        state.loading = false;
        state.employers = action.payload;
      })
      .addCase(hireJobseeker.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Action creators are generated for each case reducer function
// export const { increment } = productSlice.actions;

export default EmployerSlice.reducer;
