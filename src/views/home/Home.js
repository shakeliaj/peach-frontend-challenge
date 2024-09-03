import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import SearchInput from '../../components/searchInput/SearchInput'
import { ReactComponent as PeachLogo } from '../../images/peach-logo.svg'

import { resetSearchTerm } from '../../redux/actions'

import styling from './home.module.scss'

// Home view

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetSearchTerm())
  }, [dispatch])

  // Returns a container that includes the Peach Finance logo and a SearchInput component
  return (
    <div className={styling['home-container']}>
      <PeachLogo />
      <SearchInput />
    </div>
  )
}

export default Home