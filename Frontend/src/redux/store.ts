import { configureStore } from "@reduxjs/toolkit";
import jobseekerReducer from "./slices/JobseekerSlice";
import EmployerReducer from "./slices/EmployerSlice";
import jobReducer from "./slices/JobsSlice";
import PhotosReducer from "./slices/PhotosSlice";
import AdminReducer from "./slices/AdminSlice";
import CommentReducer from "./slices/CommentSlice";

export const store = configureStore({
  reducer: {
    jobseekers: jobseekerReducer,
    employers: EmployerReducer,
    jobs: jobReducer,
    photos: PhotosReducer,
    admins: AdminReducer,
    comments: CommentReducer,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
