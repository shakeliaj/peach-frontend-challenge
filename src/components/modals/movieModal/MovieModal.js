import React, { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Modal } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'

import { ReactComponent as StarIcon } from '../../../images/star.svg'

import PlotModal from '../plotModal/PlotModal'

import { getMovieById } from '../../../services/movieService'
import { removeFavorite, setFavorite } from '../../../redux/actions'

import styling from './movieModal.module.scss'

// MovieModal component
// Is displayed in MovieGrid component on /search and /favorites pages

const MovieModal = ({ selectedMovieId, closeModal, isOpen }) => {
  const [movieDetails, setMovieDetails] = useState({})
  const [errorMessage, setErrorMessage] = useState('')

  const dispatch = useDispatch()

  const favorites = useSelector(state => state?.favorites)

  useEffect(() => {
    const getMovieDetails = async () => {
      // Call the 'getMovieById' function to get the details of the selected movie
      const {
        details,
        error,
      } = await getMovieById(selectedMovieId)

      setMovieDetails(details || {})
      setErrorMessage(error || '')
    }

    // If a selectedMovieId exists, get the movie details
    if (selectedMovieId) {
      getMovieDetails()
    }

  }, [selectedMovieId])

  // Variable is true if the Redux list of saved favorites includes the selectedMovieId, false otherwise
  const isFavorite = useMemo(() => (
    favorites?.includes(selectedMovieId)
  ), [selectedMovieId, favorites])

  // Variable is true if there is no image available for the movie, false otherwise
  const modalImageNotAvailable = useMemo(() => (
    movieDetails?.Poster === 'N/A'
  ), [movieDetails])

  // Function updates the list of favorite movies
  // It either adds the movie (if it is not a current favorite)
  // Or removes the movie (if it currently set as as favorite)
  const handleUpdateFavorites = useCallback(() => {
    if (isFavorite) {
      dispatch(removeFavorite(selectedMovieId))
    } else {
      dispatch(setFavorite(selectedMovieId))
    }

    closeModal()
  }, [isFavorite, dispatch, selectedMovieId, closeModal])

  // Convert a m
  // Function to convert the movie's runtime minutes to a string in the format of: {num}h, {num}m
  const convertMinutesToHoursAndMinutes = minutes => {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60

    return `${hours}h ${remainingMinutes}m`
  }

  // Function that returns array of stars to display for movie rating
  // Stars that should be shaded in will get an additional className
  const showStarRating = rating => {
    const stars = []
    const updatedRating = parseFloat(rating / 2)
    for (let i = 1; i <= 5; i++) {
      if (i <= updatedRating) {
        stars.push(<StarIcon key={`star${i}`} className={styling.shaded} />)
      } else {
        stars.push(<StarIcon key={`star${i}`} />)
      }
    }

    return stars
  }

  const buttonClasses = classNames(
    'button',
    styling.button,
    isFavorite && styling.favorite,
  )

  // Returns Material UI modal showing selected movie and its details
  // If modal image not available, default container is displayed
  // User can add movie to Favorites list or remove it from Favorites list in this modal
  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      className={classNames('modal', styling['movie-modal'])}
    >
      <div className={classNames('modal-content-container', styling['content-container'])}>
        {!errorMessage ? (
          <>
            <div
              className={styling['movie-image']}
              style={modalImageNotAvailable ? {} : { backgroundImage: `url(${movieDetails?.Poster})` }}
            >
              {modalImageNotAvailable ? <p>Image not Available</p> : null}
            </div>
            <div className={styling['details-container']}>
              <h1>{movieDetails?.Title}</h1>
              {movieDetails?.Plot !== 'N/A' ? (
                <p className={styling.plot}>
                  {movieDetails?.Plot?.substring(0, 200)}{' '}
                  {movieDetails?.Plot?.length > 200 ? <PlotModal plot={movieDetails?.Plot} /> : null}
                </p>
              ) : null}
              <div className={styling['ratings-container']}>
                {movieDetails?.imdbRating !== 'N/A' ? <div>{showStarRating(movieDetails?.imdbRating)}</div> : null}
                {movieDetails?.Runtime !== 'N/A' ? (
                  <span>{convertMinutesToHoursAndMinutes(movieDetails?.Runtime?.split(' ')[0])}</span>
                ) : null}
                <span className={styling.rating}>{movieDetails?.Rated}</span>
              </div>
              <button
                className={buttonClasses}
                onClick={() => handleUpdateFavorites()}
              >
                <StarIcon />
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
              <p><span>Cast:</span> {movieDetails?.Actors}</p>
              <p><span>Genre:</span> {movieDetails?.Genre}</p>
            </div>
          </>
        ) : (
          <div className={styling['error-container']}>
            <h3>
              Error loading movie details.<br /> Please close the modal and try again.
            </h3>
            <button className={classNames('button', styling.button)} onClick={closeModal}>Close</button>
          </div>
        )}
      </div>
    </Modal >
  )
}

MovieModal.propTypes = {
  selectedMovieId: PropTypes.string,
  closeModal: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default MovieModal