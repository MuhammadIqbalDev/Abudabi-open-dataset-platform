import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    aboutus: null
}

export const aboutusSlice = createSlice({
    name: 'about',
    initialState,
    reducers: {
        setAboutus: (state, action) => {
            state.aboutus = action.payload
        }
    },
})

export const { setAboutus } = aboutusSlice.actions

export default aboutusSlice.reducer