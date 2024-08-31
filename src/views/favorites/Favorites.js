import React from 'react'
import { useSelector } from 'react-redux'

import Navigation from '../../components/navigation/Navigation'
import MovieCard from '../../components/movieCard/MovieCard'

const Favorites = () => {
  const favorites = useSelector(state => state?.favorites)

  const getFavorites = () => (
    favorites?.map((item, index) => (
      <MovieCard key={`favorite-${index}`} {...item} />
    ))
  )

  return (
    <>
      <Navigation />
      <div>
        <h2>Favorites</h2>
        <div className='movie-grid'>
          {getFavorites()}
        </div>
      </div>
    </>
  )
}

export default Favorites