import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import gamesReducer from './gamesSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
import { shopAPI } from './shopAPI'

export const store = configureStore({
  reducer: {
    user: userReducer,
    games: gamesReducer,
    // Add the generated reducer as a specific top-level slice
    [shopAPI.reducerPath]: shopAPI.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopAPI.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)