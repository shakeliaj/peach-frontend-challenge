export const SET_SEARCH_TERM = 'SET_SEARCH_TERM'
export const RESET_SEARCH_TERM = 'RESET_SEARCH_TERM'
export const SET_FAVORITE = 'SET_FAVORITE'
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE'

export const setSearchTerm = payload => {
  // Search term payload will be a string value
  return {
    payload,
    type: SET_SEARCH_TERM,
  }
}

export const resetSearchTerm = () => {
  return {
    type: RESET_SEARCH_TERM,
  }
}

export const setFavorite = payload => {
  // Favorite payload will be a movie ID (string value)
  return {
    payload,
    type: SET_FAVORITE,
  }
}

export const removeFavorite = payload => {
  // Favorite payload will be a movie ID (string value)
  return {
    payload,
    type: REMOVE_FAVORITE,
  }
}
