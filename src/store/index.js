import { configureStore } from '@reduxjs/toolkit'

import { blogAPI } from '../services/blog'

import appSlice from './app-slice'

const store = configureStore({
  reducer: {
    [blogAPI.reducerPath]: blogAPI.reducer,
    app: appSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogAPI.middleware),
})

export default store
