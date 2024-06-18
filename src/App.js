import { useState, useCallback } from "react";
import { Routes, Route, useSearchParams, useNavigate } from "react-router-dom";
import "reactjs-popup/dist/index.css";
import { ENDPOINT, API_KEY } from "./constants";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Starred from "./pages/Starred";
import Home from "./pages/Home";
import WatchLater from "./pages/WatchLater";
import YouTubePlayer from "./components/YoutubePlayer";
import "./app.scss";

const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const navigate = useNavigate();

  const [videoKey, setVideoKey] = useState(null);
  const [isOpen, setOpen] = useState(false);

  const closeModal = () => setOpen(false);

  const searchMovies = useCallback(
    (query) => {
      navigate("/");
      setSearchParams(query ? { search: query } : {});
    },
    [navigate, setSearchParams]
  );
  const getMovie = useCallback(async (id) => {
    const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`;

    setVideoKey(null);
    const videoData = await fetch(URL).then((response) => response.json());

    if (videoData.videos && videoData.videos.results.length) {
      const trailer = videoData.videos.results.find(
        (vid) => vid.type === "Trailer"
      );
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key);
    }
  }, []);
  const viewTrailer = useCallback(
    async (movie) => {
      await getMovie(movie.id);
      setOpen(true);
    },
    [getMovie]
  );

  return (
    <div className="App">
      <Header
        searchMovies={searchMovies}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                searchQuery={searchQuery}
                searchMovies={searchMovies}
                viewTrailer={viewTrailer}
              />
            }
          />
          <Route
            path="/starred"
            element={<Starred viewTrailer={viewTrailer} />}
          />
          <Route
            path="/watch-later"
            element={<WatchLater viewTrailer={viewTrailer} />}
          />
          <Route
            path="*"
            element={<h1 className="not-found">Page Not Found</h1>}
          />
        </Routes>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal}>
        {videoKey ? (
          <YouTubePlayer videoKey={videoKey} />
        ) : (
          <div style={{ padding: "30px" }}>
            <h6>No trailer available. Try another movie.</h6>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default App;
