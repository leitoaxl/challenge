import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from './moviesSlice';
import starredSlice from './starredSlice';
import watchLaterSlice from './watchLaterSlice';

const store = configureStore({
  reducer: {
    movies: moviesSlice,
    starred: starredSlice,
    watchLater: watchLaterSlice,
  },
});

export default store;
