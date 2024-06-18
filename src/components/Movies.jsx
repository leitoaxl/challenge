import React from 'react';
import Movie from './Movie';
import '../styles/movies.scss';

const Movies = ({ movies, viewTrailer, closeCard }) => {
  if (!movies || movies.length === 0) {
    return <div data-testid="no-movies">No movies available</div>;
  }

  return (
    <div data-testid="movies" className="movies-grid">
      {movies.map((movie) => (
        <Movie 
          movie={movie} 
          key={movie.id}
          viewTrailer={viewTrailer}
          closeCard={closeCard}
        />
      ))}
    </div>
  );
};

export default Movies;
