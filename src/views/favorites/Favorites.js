import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Navigation from '../../components/navigation/Navigation'
import MovieGrid from '../../components/movieGrid/MovieGrid'

import { getMovieById } from '../../services/movieService'

// Favorites view (/favorites)

const Favorites = () => {
  const favorites = useSelector(state => state?.favorites)
  const [movies, setMovies] = useState([])

  useEffect(() => {
    // Call the 'getMoviesById' function for all of the movie IDs in the favorites list
    // that is saved in Redux state, so that a list of movie objects is created
    const getFavoriteMoviesList = async () => {
      const getMovies = () => {
        return Promise.all([...favorites, '']?.map(async favorite => {
          const response = await getMovieById(favorite)

          if (response) {
            return response
          }
        }))
      }

      let list = await getMovies()
      // remove all objects that contain an error from the list
      list = list.filter(movie => movie?.error === undefined)

      // Set the movies state variable to the list of movie objects
      setMovies(list?.length ? list.map(item => item.details) : [])
    }

    // Get an updated list of movies, each time the list of favorite IDs changes
    getFavoriteMoviesList()
  }, [favorites])

  // Displays Navigation component and MovieGrid of favorite movies
  return (
    <>
      <Navigation />
      <div>
        <h2>Favorites</h2>
        <MovieGrid movies={movies} />
      </div>
    </>
  )
}

export default Favorites