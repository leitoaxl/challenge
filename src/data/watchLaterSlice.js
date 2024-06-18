import { createSlice } from "@reduxjs/toolkit";

const watchLaterSlice = createSlice({
    name: 'watchLater',
    initialState: {
        watchLaterMovies: []
    },
    reducers: {
        addToWatchLater: (state, action) => {
            state.watchLaterMovies.unshift(action.payload); 
        },
        removeFromWatchLater: (state, action) => {
            const { id } = action.payload;
            state.watchLaterMovies = state.watchLaterMovies.filter(movie => movie.id !== id);
        },
        removeAllWatchLater: (state) => {
            state.watchLaterMovies = [];
        },
    },
});

export const { addToWatchLater, removeFromWatchLater, removeAllWatchLater } = watchLaterSlice.actions;

export default watchLaterSlice.reducer;
