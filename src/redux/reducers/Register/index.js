import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    registerUserDetails: {
        name: "",
        email: "",
        reEmail: "",
        password: ""
    }
}

export const RegisterSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        handleRegisterDetails: (state, action) => {
            state.registerUserDetails = action.payload
        }
    },
})

export const { handleRegisterDetails } = RegisterSlice.actions

export default RegisterSlice.reducer