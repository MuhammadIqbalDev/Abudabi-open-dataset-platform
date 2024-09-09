import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categories: null,
    questions: null
}

export const supportSlice = createSlice({
    name: 'support',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload
        },
        setQuestions: (state, action) => {
            state.questions = action.payload
        }
    },
})

export const { setCategories, setQuestions } = supportSlice.actions

export default supportSlice.reducer