import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async (apiUrl) => {
  const response = await fetch(apiUrl, {
    method: "GET",
    headers: new Headers({
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwY2NhMDM1YWI3MDJhNGM0Y2JmY2EwOWUyOTE2ZmI1MyIsInN1YiI6IjY2NjlkMzQ2MWZhMWUwMzI3ZDM3ZjQ5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PllBCNJ24GpUc_nJhmRv3EmoTHOIEhrwk87C_zZJKG0",
    }),
  });
  return response.json();
});

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    results: [],
    fetchStatus: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchMovies.fulfilled, (state, action) => {
      const { results } = action.payload;
      const isInitialFetch = action.meta.arg.includes("page=1");
    
      if (isInitialFetch) {
        state.results = results; 
      } else {
        const combinedResults = state.results.concat(results);
        state.results = combinedResults.filter(
          (movie, index, self) => index === self.findIndex((m) => m.id === movie.id)
        );
      }
    
      state.fetchStatus = "success";
    })
      .addCase(fetchMovies.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.fetchStatus = "error";
      });
  },
});

export default moviesSlice.reducer;
