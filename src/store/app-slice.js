import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

const appSlice = createSlice({
  name: 'app',
  initialState: {
    page: 1,
    user: null,
  },
  reducers: {
    changePage: (state, action) => {
      state.page = action.payload
    },
    login: (state, action) => {
      const data = JSON.parse(JSON.stringify(action.payload))
      delete data.token
      state.user = data
      Cookies.set('authToken', action.payload.token, { expires: 1, secure: true })
    },
    userUpdate: (state, action) => {
      const data = JSON.parse(JSON.stringify(action.payload))
      delete data.token
      state.user = data
    },
    logout: (state) => {
      state.user = null
      Cookies.remove('authToken')
    },
  },
})

export const { changePage, login, userUpdate, logout } = appSlice.actions

export default appSlice.reducer
