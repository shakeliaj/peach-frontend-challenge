import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import styling from './movieCard.module.scss'

// MovieCard component
// Displayed in grid on /search page

const MovieCard = ({
  Poster: poster, // movie image url
  Title: title, // movie title
  Year: year, // year movie was created
  imdbID: id,
  handleCardClick,
}) => {
  // Variable is true if there is no image available for the movie, false otherwise
  const imageNotAvailable = useMemo(() => poster === 'N/A', [poster])

  // Return container with movie image
  // If the image is not available, return default container
  return (
    <div
      className={styling['movie-card']}
      role='button'
      onClick={handleCardClick}
    >
      {imageNotAvailable ? (
        <div>{title}<br />(image not available)</div>
      ) : (
        <img alt={title} src={poster} />
      )}
    </div>
  )
}

MovieCard.propTypes = {
  poster: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.string,
  id: PropTypes.string,
  handleCardClick: PropTypes.func,
}

export default MovieCard