import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeAllWatchLater } from '../data/watchLaterSlice';
import Movie from './../components/Movie';
import '../styles/starred.scss';

const WatchLater = ({ viewTrailer }) => {
  const { watchLaterMovies } = useSelector((state) => state.watchLater);
  const dispatch = useDispatch();

  const handleEmptyWatchLater = () => {
    dispatch(removeAllWatchLater());
  };

  return (
    <div className="watch-later" data-testid="watch-later-div">
      {watchLaterMovies.length > 0 ? (
        <div data-testid="watch-later-movies" className="starred-movies">
          <h6 className="header">Watch Later List</h6>
          <div className="movies-grid">
            {watchLaterMovies.map((movie) => (
              <Movie 
                movie={movie} 
                key={movie.id}
                viewTrailer={viewTrailer}
              />
            ))}
          </div>

          <footer className="text-center">
            <button
              className="btn btn-primary back-button"
              onClick={handleEmptyWatchLater}
              aria-label="Empty watch later list"
            >
              Empty List
            </button>
          </footer>
        </div>
      ) : (
        <div className="text-center empty-cart">
          <i className="bi bi-heart" />
          <p>You have no movies saved to watch later.</p>
          <p>Go to <Link to="/">Home</Link></p>
        </div>
      )}
    </div>
  );
};

export default WatchLater;
