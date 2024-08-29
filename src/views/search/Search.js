import React, { useCallback, useEffect, useState } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import SearchInput from '../../components/searchInput/SearchInput'

import { getMoviesBySearch } from '../../services/movieService'

import styling from './search.module.scss'

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [movieList, setMovieList] = useState([])
  const [totalPages, setTotalPages] = useState(0)
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
      setTotalPages(totalResults ? Math.ceil(parseInt(totalResults) / 10) : 0)
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
    return pages
  }, [totalPages, currentPage])

  return (
    <>
      {!searchTerm ? <Navigate to='/' /> : (
        <>
          <div>
            <p>search</p>
            <SearchInput defaultValue={searchTerm} onSearch={() => setCurrentPage(1)} />
          </div>
          {movieList?.map((item, index) => <div key={`${item.Title}-${index}`}>{item.Title}</div>)}
          {errorMessage && <p>Error: {errorMessage}</p>}
          {getPagination()}
        </>
      )
      }
    </>
  )
}

export default Search