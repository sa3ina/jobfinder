import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
interface admin {
  id: String;
  firstname: String;
  lastname: String;
  email: String;
  password: String;
}

interface adminState {
  admins: admin[];
  loading: boolean;
  error: string | null;
}
const initialState: adminState = {
  admins: [],
  loading: false,
  error: null,
};
export const fetchAdmin = createAsyncThunk(
  "get/admininfo",
  async (): Promise<admin[]> => {
    const response = await axios("https://jobfinder-4jwl.onrender.com/admin");
    return await response.data;
  }
);

export const AdminSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAdmin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAdmin.fulfilled, (state, action) => {
      state.admins = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchAdmin.rejected, (state) => {
      state.loading = false;
    });
  },
});

// Action creators are generated for each case reducer function
// export const { increment } = productSlice.actions;

export default AdminSlice.reducer;
