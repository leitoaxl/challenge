import { useDispatch, useSelector } from 'react-redux';
import { starMovie, unstarMovie } from '../data/starredSlice';
import { addToWatchLater, removeFromWatchLater } from '../data/watchLaterSlice';
import placeholder from '../assets/not-found-500X750.jpeg';

const Movie = ({ movie, viewTrailer, setOpen }) => {
  const dispatch = useDispatch();
  const { starredMovies } = useSelector((state) => state.starred);
  const { watchLaterMovies } = useSelector((state) => state.watchLater);

  const handleClick = (e) => {
    e.stopPropagation();
    e.currentTarget.parentElement.parentElement.classList.remove('opened');
  };

  const handleViewTrailer = async () => {
    await viewTrailer(movie);
    setOpen(true);
  };

  const isStarred = starredMovies.some((m) => m.id === movie.id);
  const isWatchLater = watchLaterMovies.some((m) => m.id === movie.id);

  const handleStarToggle = () => {
    if (isStarred) {
      dispatch(unstarMovie(movie));
    } else {
      dispatch(starMovie({
        id: movie.id,
        overview: movie.overview,
        release_date: movie.release_date?.substring(0, 4),
        poster_path: movie.poster_path,
        title: movie.title,
      }));
    }
  };

  const handleWatchLaterToggle = () => {
    if (isWatchLater) {
      dispatch(removeFromWatchLater(movie));
    } else {
      dispatch(addToWatchLater({
        id: movie.id,
        overview: movie.overview,
        release_date: movie.release_date?.substring(0, 4),
        poster_path: movie.poster_path,
        title: movie.title,
      }));
    }
  };

  return (
    <div className="wrapper">
      <div className="card" onClick={(e) => e.currentTarget.classList.add('opened')}>
        <div className="card-body text-center">
          <div className="overlay" />
          <div className="info_panel">
            <div className="overview">{movie.overview}</div>
            <div className="year">{movie.release_date?.substring(0, 4)}</div>
            <span
              className="btn-star"
              data-testid={isStarred ? "unstar-link" : "starred-link"}
              aria-label={isStarred ? "Unstar Movie" : "Star Movie"}
              onClick={handleStarToggle}
            >
              <i className={`bi ${isStarred ? "bi-star-fill" : "bi-star"}`} data-testid={isStarred ? "star-fill" : null} />
            </span>
            <button
              type="button"
              data-testid={isWatchLater ? "remove-watch-later" : "watch-later"}
              className={`btn btn-light btn-watch-later ${isWatchLater ? "blue" : ""}`}
              onClick={handleWatchLaterToggle}
            >
              {isWatchLater ? <i className="bi bi-check" /> : "Watch Later"}
            </button>
            <button
              type="button"
              className="btn btn-dark"
              onClick={handleViewTrailer}
            >
              View Trailer
            </button>
          </div>
          <img
            className="center-block"
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : placeholder}
            alt={`${movie.title} poster`}
          />
        </div>
        <h6 className="title mobile-card">{movie.title}</h6>
        <button
          type="button"
          className="close"
          onClick={handleClick}
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
};

export default Movie;
