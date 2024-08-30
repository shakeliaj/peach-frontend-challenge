import React, { useCallback, useEffect, useState } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import SearchInput from '../../components/searchInput/SearchInput'
import MovieCard from '../../components/movieCard/MovieCard'
import { ReactComponent as PeachLogo } from '../../images/peach-logo.svg'

import { getMoviesBySearch } from '../../services/movieService'

import styling from './search.module.scss'

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [movieList, setMovieList] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [errorMessage, setErrorMessage] = useState('')

  const searchTerm = useSelector(state => state?.searchTerm)

  useEffect(() => {
    const getMovies = async () => {
      // Call the 'getMoviesBySearch' function to get a paginated list of movies using the
      // searchTerm in the input field and the selected page number
      const {
        movies,
        totalResults,
        error,
      } = await getMoviesBySearch({ pageNum: currentPage, searchTerm })

      setMovieList(movies || [])
      setTotalResults(totalResults || 0)
      setErrorMessage(error || '')
    }

    // Get updated list of movies
    getMovies()
  }, [currentPage, searchTerm])

  useEffect(() => {
    // Update the search term in the URL when it is changed in the application
    searchParams.set('title', searchTerm)
    setSearchParams(searchParams)
  }, [searchTerm, searchParams, setSearchParams])

  useEffect(() => {
    // Update the page number in the URL when it is changed in the application
    searchParams.set('page', currentPage)
    setSearchParams(searchParams)
  }, [currentPage, searchParams, setSearchParams])

  const getPagination = useCallback(() => {
    const totalPages = totalResults ? Math.ceil(parseInt(totalResults) / 10) : 0
    const pages = []
    for (let page = 1; page <= totalPages; page++) {
      pages.push(
        <button
          key={`page-${page}`}
          onClick={() => setCurrentPage(page)}
          className={currentPage === page ? styling.active : ''}
        >
          {page}
        </button>
      )
    }
    return <div className={styling['pagination-container']}>{pages}</div>
  }, [totalResults, currentPage])

  const getMovieCards = useCallback(() => (
    movieList?.map((item, index) => (
      <MovieCard key={`${item.Title}-${index}`} {...item} />
    ))
  ), [movieList])

  return (
    <>
      {!searchTerm ? <Navigate to='/' /> : (
        <div className={styling['search-container']}>
          <div className={styling['navigation-menu']}>
            <PeachLogo />
            <SearchInput
              defaultValue={searchTerm}
              onSearch={() => setCurrentPage(1)}
              className={styling['search-input']}
            />
          </div>
          {movieList?.length ? (
            <div className={styling['content-container']}>
              <h2>{`Search results for "${searchTerm}"`}</h2>
              <div className={styling['movies-container']}>
                {getMovieCards()}
              </div>
              <div className={styling['results-container']}>
                {getPagination()}
                <span>{movieList?.length} of {totalResults} results</span>
              </div>
            </div>
          ) : null}
          {errorMessage ? (
            <div className={styling['error-container']}>
              <p>{errorMessage}<br />Please update your search criteria and try again.</p>
            </div>
          ) : null}
        </div >
      )
      }
    </>
  )
}

export default Search