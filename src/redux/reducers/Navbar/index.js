import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    navbarIndex: null
}

export const navbarSlice = createSlice({
    name: 'navbar',
    initialState,
    reducers: {
        setNavbarIndex: (state, action) => {
            state.navbarIndex = action.payload
        }
    },
})

export const { setNavbarIndex } = navbarSlice.actions

export default navbarSlice.reducer