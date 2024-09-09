import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    stories: null,
    filters: [
        {
            type: "Sort By",
            title: 'Recent'
        }
    ],
    loading: true
}

export const storiesSlice = createSlice({
    name: 'stories',
    initialState,
    reducers: {
        setStories: (state, action) => {
            state.stories = action.payload
        },
        setStoriesFilters: (state, action) => {
            state.filters = action.payload
        },
        toggleLoading: (state, action) => {
            state.loading = !state.loading
        }
    },
})

export const { setStories, setStoriesFilters, toggleLoading } = storiesSlice.actions

export default storiesSlice.reducer