import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export default function InfoCard({ video, reverse, headingText, paragraphText }) {
  return (
    <div className="card-container" style={reverse ? { flexDirection: 'row-reverse' } : {}}>
      <div className="video-container">
        <video autoPlay muted loop>
          <source src={video} type="video/mp4" />
        </video>

      </div>
      <div className="info-container">
        <h2>{headingText}</h2>
        <p>{paragraphText}</p>
      </div>
    </div>
  );
}

InfoCard.propTypes = {
  video: PropTypes.string.isRequired,
  reverse: PropTypes.bool,
  headingText: PropTypes.string.isRequired,
  paragraphText: PropTypes.string.isRequired,
};

InfoCard.defaultProps = {
  reverse: false,
};
