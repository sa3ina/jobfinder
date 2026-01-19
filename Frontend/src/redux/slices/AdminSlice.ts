//@ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
interface admin {
  id: String;
  firstname: String;
  lastname: String;
  email: String;
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

const API_URL = import.meta.env.VITE_API_URL;

export const fetchAdmin = createAsyncThunk(
  "get/admininfo",
  async (): Promise<admin[]> => {
    const response = await axios.get(`${API_URL}/admin`);
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

export default AdminSlice.reducer;
