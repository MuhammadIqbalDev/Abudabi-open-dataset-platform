import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    applications: null
}

export const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        setApplications: (state, action) => {
            state.applications = action.payload
        }
    },
})

export const { setApplications } = applicationSlice.actions

export default applicationSlice.reducer