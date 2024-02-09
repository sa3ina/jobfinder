import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
interface employer {
  id: String;
  firstname: String;
  lastname: String;
  email: String;
  password: String;
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
export const EmployerSlice = createSlice({
  name: "employers",
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
    builder.addCase(postData.rejected, (state) => {
      state.loading = false;
    });
  },
});

// Action creators are generated for each case reducer function
// export const { increment } = productSlice.actions;

export default EmployerSlice.reducer;
