import { createSlice } from "@reduxjs/toolkit";

const starredSlice = createSlice({
  name: 'starred',
  initialState: {
    starredMovies: []
  },
  reducers: {
    starMovie: (state, action) => {
      state.starredMovies = [action.payload, ...state.starredMovies];
    },
    unstarMovie: (state, action) => {
      state.starredMovies = state.starredMovies.filter(movie => movie.id !== action.payload.id);
    },
    clearAllStarred: (state) => {
      state.starredMovies = [];
    },
  },
});

export const { starMovie, unstarMovie, clearAllStarred } = starredSlice.actions;
export default starredSlice.reducer;
