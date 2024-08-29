import { combineReducers } from '@reduxjs/toolkit'

import {
  SET_SEARCH_TERM,
  RESET_SEARCH_TERM,
  SET_FAVORITE,
  REMOVE_FAVORITE,
} from './actions'

const searchTermReducer = (state = '', action = {}) => {
  // When setting the search term, set it to the passed in string value
  // When resetting the search term, set it to be blank
  // By default, return the current search term state
  switch (action.type) {
    case SET_SEARCH_TERM:
      return action.payload
    case RESET_SEARCH_TERM:
      return ''
    default:
      return state
  }
}

const favoritesReducer = (state = [], action = {}) => {
  // When setting a favorite, add it to the pre-existing list of favorites
  // When removing a favorite, filter out the movie ID that should be removed
  // By default, return the current list state
  switch (action.type) {
    case SET_FAVORITE:
      return [
        ...state,
        ...action.payload,
      ]
    case REMOVE_FAVORITE:
      return state?.filter(item => item !== action.payload)
    default:
      return state
  }
}

export default combineReducers({
  searchTerm: searchTermReducer,
  favorites: favoritesReducer,
})