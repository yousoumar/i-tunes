import { configureStore } from "@reduxjs/toolkit";
import musicListSlicer from "../features/music/musicSlice";

export const store = configureStore({
  reducer: {
    musicList: musicListSlicer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
