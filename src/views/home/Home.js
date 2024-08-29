import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import SearchInput from '../../components/searchInput/SearchInput'

import { resetSearchTerm } from '../../redux/actions'

const Home = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetSearchTerm())
  }, [dispatch])

  return (
    <div>
      <p>home</p>
      <SearchInput onSearch={() => navigate('/search')} />
    </div>
  )
}

export default Home