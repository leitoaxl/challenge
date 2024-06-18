import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { fetchMovies } from "../data/moviesSlice";
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER } from "../constants";

const useFetchMovies = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1); 
  const getMovies = useCallback(
    async ({ pageNum = page, searchQuery = "" } = {}) => {
      setLoading(true);
      setError(null);

      try {
        let endpoint = searchQuery
          ? `${ENDPOINT_SEARCH}&query=${searchQuery}&page=${pageNum}`
          : `${ENDPOINT_DISCOVER}&page=${pageNum}`;

        const response = await dispatch(fetchMovies(endpoint));
        const newMovies = response.payload.results;

        if (!searchQuery && pageNum === 1) {
          setMovies(newMovies);
        } else {
          setMovies((prevMovies) => [...prevMovies, ...newMovies]);
        }

        setPage(pageNum + 1);
      } catch (err) {
        setError("Failed to fetch movies.");
      } finally {
        setLoading(false);
      }
    },
    [dispatch, page]
  );

  const getMovie = useCallback(async (id) => {}, []);

  return { movies, getMovie, loading, error, getMovies };
};

export default useFetchMovies;
