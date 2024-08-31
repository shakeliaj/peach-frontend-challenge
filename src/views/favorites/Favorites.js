import React from 'react'
import { useSelector } from 'react-redux'

import Navigation from '../../components/navigation/Navigation'
import MovieGrid from '../../components/movieGrid/MovieGrid'

const Favorites = () => {
  const favorites = useSelector(state => state?.favorites)

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