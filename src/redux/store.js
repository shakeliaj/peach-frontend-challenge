import { configureStore } from '@reduxjs/toolkit'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import rootReducer from './reducers'

// Config for persisting Redux state
const persistConfig = {
  key: 'root',
  storage,
}

// Persisted reducer to use in store configuration
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Configured Redux store object
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
})

// Persisted store state
export const persistor = persistStore(store)
