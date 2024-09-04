import React, { useState } from 'react'
import PropTypes from 'prop-types'

import MovieCard from '../movieCard/MovieCard'
import MovieModal from '../modals/movieModal/MovieModal'

import styling from './movieGrid.module.scss'

// MovieGrid component
// Displays MovieCard components on /search and /favorites pages

const MovieGrid = ({ movies = [] }) => {
  const [selectedMovieId, setSelectedMovieId] = useState('')
  const [open, setOpen] = useState(false)

  // Function sets value of selectedMovieId to the imdbID associated with the
  // MovieCard that was clicked and opens the modal
  const handleCardClick = item => {
    setSelectedMovieId(item?.imdbID)
    setOpen(true)
  }

  // Function returns array of MovieCards for the list of movies that is passed in
  const getGridMovies = () => (
    movies?.map((item, index) => (
      <MovieCard
        key={`${item.Title}-${index}`}
        {...item}
        handleCardClick={() => handleCardClick(item)}
      />
    ))
  )

  // Returns movie grid and modal for showing more details about selected movie
  return (
    <>
      <div className={styling['movie-grid']}>
        {getGridMovies()}
      </div>
      <MovieModal
        selectedMovieId={selectedMovieId}
        closeModal={() => setOpen(false)}
        isOpen={open}
      />
    </>
  )
}

MovieGrid.propTypes = {
  movies: PropTypes.array,
}

export default MovieGrid