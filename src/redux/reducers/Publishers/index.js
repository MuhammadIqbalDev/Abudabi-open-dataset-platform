import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    publisherSuggestion: null
}

export const publisherSlice = createSlice({
    name: 'publisher',
    initialState,
    reducers: {
        setPublisherSuggestion: (state, action) => {
            state.publisherSuggestion = action.payload
        }
    },
})

export const { setPublisherSuggestion } = publisherSlice.actions

export default publisherSlice.reducer