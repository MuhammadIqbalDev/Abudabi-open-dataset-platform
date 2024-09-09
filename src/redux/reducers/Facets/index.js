import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    staticTopics: null,
    topics: null,
    publishers: null,
    tags: null,
    file_Formats: null,
    filter: null,
    search: "",
    storiesTags: null,
    datasetsSuggestion: null,
    supportSuggestion: null
}

export const facetsSlice = createSlice({
    name: 'facets',
    initialState,
    reducers: {
        setStaticTopics: (state, action) => {
            state.staticTopics = action.payload
        },
        setTopics: (state, action) => {
            state.topics = action.payload
        },
        setPublishers: (state, action) => {
            state.publishers = action.payload
        },
        setTags: (state, action) => {
            state.tags = action.payload
        },
        setFileFormats: (state, action) => {
            state.file_Formats = action.payload
        },
        setStoriesTags: (state, action) => {
            state.storiesTags = action.payload
        },
        setFilter: (state, action) => {
            state.filter = action.payload
        },
        setSearch: (state, action) => {
            state.search = action.payload
        },
        setDatasetsSuggestion: (state, action) => {
            state.datasetsSuggestion = action.payload
        },
        setSupportSuggestion: (state, action) => {
            state.supportSuggestion = action.payload
        }
    }
})

export const { setStaticTopics, setTopics, setPublishers, setTags, setFileFormats, setFilter, setSearch, setStoriesTags, setDatasetsSuggestion, setSupportSuggestion } = facetsSlice.actions

export default facetsSlice.reducer