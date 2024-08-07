import { configureStore } from '@reduxjs/toolkit'

import { blogAPI } from '../services/blog.js'

import appSlice from './app-slice.js'

const store = configureStore({
  reducer: {
    [blogAPI.reducerPath]: blogAPI.reducer,
    app: appSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogAPI.middleware),
})

export default store
