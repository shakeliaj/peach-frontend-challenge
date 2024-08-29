import axios from 'axios'

const getMoviesBySearch = async ({ searchTerm = 'guardians', pageNum = 1 }) => {
  // Make a call to the OMDB API using the passed in searchTerm and pageNum values as params
  const response =
    await axios.get(`http://www.omdbapi.com/?apikey=d15d95d&s=${searchTerm}&page=${pageNum}&type=movie`)

  if (response?.data) {
    const {
      Search: searchDetails,
      totalResults = 0,
      Error: errorMessage,
    } = response.data

    // If a list of movies is returned, return the list and total number of movies
    // Otherwise, if there is an error, return the error
    if (searchDetails) {
      return { movies: searchDetails, totalResults }
    } else if (errorMessage) {
      return { error: errorMessage }
    }
  }
}

export { getMoviesBySearch }