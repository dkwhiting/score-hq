import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions

export default userSlice.reducer