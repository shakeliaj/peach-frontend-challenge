import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'

import { setSearchTerm } from '../../redux/actions'

import styling from './searchInput.module.scss'

// SearchInput component
// Displayed on home (/) page
// and in Navigation component (which is displayed on /search and /favorites pages)

const SearchInput = ({ defaultValue, className }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      // Listener function so that when user clicks 'Enter' while in the search input,
      // if there is a search term value, then the value is saved to Redux state as the
      // searchTerm and the user is then navigated to the /search page
      const listener = (event) => {
        if (event.key === 'Enter' && inputRef?.current?.value) {
          event.stopImmediatePropagation()

          dispatch(setSearchTerm(inputRef.current.value))
          navigate('/search')
        }
      }

      // Add the keypress event listener to the input element to check for 'Enter' click
      inputRef.current.addEventListener('keypress', listener)
    }
  }, [dispatch, navigate])

  const containerClasses = classNames(
    styling['search-input-container'],
    className && className,
  )

  // Returns a container that has an input component for entering search text
  return (
    <div className={containerClasses}>
      <input
        defaultValue={defaultValue}
        ref={inputRef}
        placeholder='Search'
      />
    </div>
  )
}

SearchInput.propTypes = {
  defaultValue: PropTypes.string,
  className: PropTypes.string,
}

export default SearchInput