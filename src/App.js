import React from 'react'
import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import Home from './views/home/Home'
import Search from './views/search/Search'
import Favorites from './views/favorites/Favorites'

import { persistor, store } from './redux/store'

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<Search />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  )
}

export default App
