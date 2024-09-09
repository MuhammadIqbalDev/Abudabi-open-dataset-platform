import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    ip_address: {}
}

export const ipAddressSlice = createSlice({
    name: 'ip_address',
    initialState,
    reducers: {
        setIpAddress: (state, action) => {
            state.ip_address = action.payload
        }
    },
})

export const { setIpAddress } = ipAddressSlice.actions

export default ipAddressSlice.reducer