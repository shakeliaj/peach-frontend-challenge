import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import { setSearchTerm } from '../../redux/actions'

const SearchInput = ({ onSearch, defaultValue }) => {
  const dispatch = useDispatch()

  const inputRef = useRef(null)

  const handleSubmit = () => {
    dispatch(setSearchTerm(inputRef?.current?.value))

    if (onSearch) {
      onSearch()
    }
  }

  return (
    <>
      <input
        defaultValue={defaultValue}
        ref={inputRef}
      />
      <button onClick={handleSubmit}>click</button>
    </>
  )
}

SearchInput.propTypes = {
  onSearch: PropTypes.func,
  defaultValue: PropTypes.string,
}

export default SearchInput