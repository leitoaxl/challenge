import { Link, NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';

import '../styles/header.scss';

const Header = ({ searchMovies }) => {
  const { starredMovies } = useSelector((state) => state.starred);
  const [ inputSearch, setInputSearch] = useState('')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((query) => searchMovies(query), 300), [searchMovies]);

  const handleHomeClick = () => {
    setInputSearch(''); 
    searchMovies('');
  };
  return (
    <header>
       <Link to="/" data-testid="home" onClick={handleHomeClick}>
        <i className="bi bi-film" aria-label="Home" />
      </Link>


      <nav>
        <NavLink to="/starred" data-testid="nav-starred" className="nav-starred">
          {starredMovies.length > 0 ? (
            <>
              <i className="bi bi-star-fill bi-star-fill-white" aria-label="Starred Movies" />
              <sup className="star-number">{starredMovies.length}</sup>
            </>
          ) : (
            <i className="bi bi-star" aria-label="Starred Movies" />
          )}
        </NavLink>
        <NavLink to="/watch-later" className="nav-fav">
          Watch Later
        </NavLink>
      </nav>

      <div className="input-group rounded">
        <Link to="/" onClick={() => {searchMovies('')
           setInputSearch('')}} className="search-link">
          <input
            value={inputSearch}
            type="search"
            data-testid="search-movies"
            onChange={(e) => {
              const query = e.target.value;
              setInputSearch(query); 
              debouncedSearch(query); 
            }}
            className="form-control rounded"
            placeholder="Search movies..."
            aria-label="Search movies"
            aria-describedby="search-addon"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
