import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import SearchInput from '../../components/searchInput/SearchInput'
import { ReactComponent as PeachLogo } from '../../images/peach-logo.svg'

import { resetSearchTerm } from '../../redux/actions'

import styling from './home.module.scss'

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetSearchTerm())
  }, [dispatch])

  return (
    <div className={styling['home-container']}>
      <PeachLogo />
      <SearchInput onSearch={() => navigate('/search')} />
    </div>
  )
}

export default Home