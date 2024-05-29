import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'app',
  initialState: {
    page: 1,
  },
  reducers: {
    changePage: (state, action) => {
      state.page = action.payload
    },
  },
})

export const { changePage } = appSlice.actions

export default appSlice.reducer
