//@ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface Photo {
  useremail: string;
  profilePicture: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
  };
}

interface PhotosState {
  photos: Photo[];
  loading: boolean;
  error: string | null;
}

const initialState: PhotosState = {
  photos: [],
  loading: false,
  error: null,
};

const API_URL = import.meta.env.VITE_API_URL;

export const fetchPhotos = createAsyncThunk(
  "get/photoinfo",
  async (): Promise<Photo[]> => {
    const response = await axios(`${API_URL}/photos`);
    return response.data.users;
  }
);
export const PhotosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPhotos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPhotos.fulfilled, (state, action) => {
      state.photos = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchPhotos.rejected, (state) => {
      state.loading = false;
    });
  },
});
export default PhotosSlice.reducer;
