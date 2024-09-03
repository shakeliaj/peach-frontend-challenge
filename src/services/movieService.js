import axios from 'axios'

const movieApiUrl = 'http://www.omdbapi.com/?apikey=d15d95d'

const getMoviesBySearch = async ({ searchTerm = 'guardians', pageNum = 1 }) => {
  // Make a call to the OMDB API using the passed in searchTerm and pageNum values as params
  const response =
    await axios.get(`${movieApiUrl}&s=${searchTerm}&page=${pageNum}&type=movie`)

  if (response?.data) {
    // If there is an error, return the error
    // Otherwise, if a list of movies is returned, return the list and total number of movies
    if (response?.data?.Error) {
      return { error: response.data.Error }
    } else {
      return {
        movies: response?.data?.Search,
        totalResults: response?.data?.totalResults,
      }
    }
  }
}


const getMovieById = async (id = '') => {
  // Make a call to the OMDB API using the passed in id as params
  const response = await axios.get(`${movieApiUrl}&i=${id}&plot=full`)

  if (response?.data) {
    // If there is an error, return the error
    // Otherwise, if a movie is returned, return the movie information
    if (response?.data?.Error) {
      return { error: response.data.Error }
    } else {
      return { details: response?.data }
    }
  }
}

export { getMoviesBySearch, getMovieById }
