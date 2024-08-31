import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import SearchInput from '../searchInput/SearchInput'
import { ReactComponent as PeachLogo } from '../../images/peach-logo.svg'

import styling from './navigation.module.scss'

const Navigation = () => {
  const searchTerm = useSelector(state => state?.searchTerm)

  return (
    <div className={styling['navigation-menu']}>
      <PeachLogo />
      <div className={styling['link-search-container']}>
        <div className={styling['nav-items']}>
          <NavLink
            to='/search'
            className={({ isActive }) => `${styling.link} ${isActive ? styling.active : ''}`}
          >
            Movies
          </NavLink>
          <NavLink
            to='/favorites'
            end
            className={({ isActive }) => `${styling.link} ${isActive ? styling.active : ''}`}
          >
            Favorites
          </NavLink>
        </div>
        <SearchInput
          defaultValue={searchTerm}
          className={styling['search-input']}
        />
      </div>
    </div>
  )
}

export default Navigation