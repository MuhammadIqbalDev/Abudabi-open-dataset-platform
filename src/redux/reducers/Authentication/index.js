import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
    userDetails: null
}

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        handleLogin: (state, action) => {
            state.isLoggedIn = true
            state.userDetails = action.payload
        },
        handleLogout: (state) => {
            state.isLoggedIn = false;
            state.userDetails = null;
        }
    },
})

export const { handleLogin, handleLogout } = authenticationSlice.actions

export default authenticationSlice.reducer