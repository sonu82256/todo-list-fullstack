import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
  currentUser : null,
  loginStatus : false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSigninData: (state, action) => {
      state.currentUser = action.payload;
    },
    checkLoginStatus: (state, action) => {
      state.loginStatus = action.payload;
    },
  },
})

export const { setSigninData, checkLoginStatus } = userSlice.actions

export default userSlice.reducer