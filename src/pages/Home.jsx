import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import Movies from "../components/Movies";
import YouTubePlayer from "../components/YoutubePlayer";
import useFetchMovies from "../hooks/useFetchMovies";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

const Home = ({ viewTrailer, closeCard, searchQuery }) => {
  const { results } = useSelector((state) => state.movies);
  const { videoKey, loading, error, getMovies } = useFetchMovies();
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const [page, setPage] = useState(1); 
  const [initialFetchDone, setInitialFetchDone] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); 

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  
  useEffect(() => {
    setInitialFetchDone(false);
    setPage(1);
    setDebouncedSearchQuery(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedSearchQuery) {
      setIsFetching(true);
      getMovies({ pageNum: 1, searchQuery: debouncedSearchQuery }).then(() => {
        setIsFetching(false);
        setInitialFetchDone(true);
      });
    }
  }, [debouncedSearchQuery, getMovies]);

  const handleFetchMore = useCallback(() => {
    if (!isFetching) {
      setIsFetching(true);
      getMovies({ pageNum: page, searchQuery: debouncedSearchQuery }).then(() => {
        setIsFetching(false);
        setPage(prevPage => prevPage + 1);
      });
    }
  }, [isFetching, getMovies, page, debouncedSearchQuery]);

  useInfiniteScroll(handleFetchMore);

  useEffect(() => {
    if (!initialFetchDone) {
      setIsFetching(true);
      getMovies({ pageNum: 1, searchQuery: debouncedSearchQuery }).then(() => {
        setIsFetching(false);
        setInitialFetchDone(true);
      });
    }
  }, [initialFetchDone, getMovies, debouncedSearchQuery]);

  return (
    <div className="home">
      <Movies
        movies={results}
        viewTrailer={viewTrailer}
        closeCard={closeCard}
      />
      {videoKey && <YouTubePlayer videoKey={videoKey} />}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Home;
