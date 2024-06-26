import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearAllStarred } from '../data/starredSlice';
import Movie from './../components/Movie';
import '../styles/starred.scss';

const Starred = ({ viewTrailer }) => {
  const { starredMovies } = useSelector((state) => state.starred);
  const dispatch = useDispatch();

  const handleClearAllStarred = () => {
    dispatch(clearAllStarred());
  };

  return (
    <div className="starred" data-testid="starred">
      {starredMovies.length > 0 ? (
        <div data-testid="starred-movies" className="starred-movies">
          <h6 className="header">Starred Movies</h6>
          <div className="movies-grid">
            {starredMovies.map((movie) => (
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
              onClick={handleClearAllStarred}
              aria-label="Remove all starred movies"
            >
              Remove All Starred
            </button>
          </footer>
        </div>
      ) : (
        <div className="text-center empty-cart">
          <i className="bi bi-star" />
          <p>There are no starred movies.</p>
          <p>
            Go to <Link to="/">Home</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Starred;
