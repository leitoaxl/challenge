import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

const YoutubePlayer = ({ videoKey }) => (
  <ReactPlayer 
    className="video-player" 
    url={`https://www.youtube.com/watch?v=${videoKey}`} 
    controls={true}
    playing={true}
    data-testid="youtube-player"
  />
);

YoutubePlayer.propTypes = {
  videoKey: PropTypes.string.isRequired,
};

export default YoutubePlayer;
