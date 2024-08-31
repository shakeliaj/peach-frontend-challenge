import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'

import { setSearchTerm } from '../../redux/actions'

import styling from './searchInput.module.scss'

const SearchInput = ({ defaultValue, className }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
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