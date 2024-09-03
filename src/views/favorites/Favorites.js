import React from 'react'
import { useSelector } from 'react-redux'

import Navigation from '../../components/navigation/Navigation'
import MovieGrid from '../../components/movieGrid/MovieGrid'

// Favorites view (/favorites)

const Favorites = () => {
  const favorites = useSelector(state => state?.favorites)

  // Displays Navigation component and MovieGrid of favorite movies
  return (
    <>
      <Navigation />
      <div>
        <h2>Favorites</h2>
        <MovieGrid movies={favorites} />
      </div>
    </>
  )
}

export default Favorites