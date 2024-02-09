import { configureStore } from "@reduxjs/toolkit";
import jobseekerReducer from "./slices/JobseekerSlice";
import EmployerReducer from "./slices/EmployerSlice";
export const store = configureStore({
  reducer: {
    jobseekers: jobseekerReducer,
    employers: EmployerReducer,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
