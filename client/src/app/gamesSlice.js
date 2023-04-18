import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  games: []
}

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setGames: (state, action) => {
      state.games = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setGames } = gamesSlice.actions

export default gamesSlice.reducer