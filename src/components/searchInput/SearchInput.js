import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'

import { setSearchTerm } from '../../redux/actions'

import styling from './searchInput.module.scss'

const SearchInput = ({ onSearch, defaultValue, className }) => {
  const dispatch = useDispatch()

  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      const listener = (event) => {
        if (event.key === 'Enter') {
          event.stopImmediatePropagation()

          dispatch(setSearchTerm(inputRef?.current?.value))

          if (onSearch) {
            onSearch()
          }
        }
      }

      // Add the keypress event listener to the input element to check for 'Enter' click
      inputRef.current.addEventListener('keypress', listener)
    }
  }, [dispatch, onSearch])

  const containerClasses = classNames(
    styling['search-input-container'],
    className && className,
  )

  return (
    <div className={containerClasses}>
      <label>
        <input
          defaultValue={defaultValue}
          ref={inputRef}
          placeholder='Search'
        />
      </label>
    </div>
  )
}

SearchInput.propTypes = {
  onSearch: PropTypes.func,
  defaultValue: PropTypes.string,
  className: PropTypes.string,
}

export default SearchInput