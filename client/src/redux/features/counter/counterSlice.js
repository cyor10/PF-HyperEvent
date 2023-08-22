'use client'

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    email: "",
    user_image: ""
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {state.value += 1},
        decrement: (state) => {state.value -= 1},
        incrementByAmount: (state, action) => {state.value += action.payload},
        getUser: (state, action) => {state.username = action.payload.username, state.user_image = action.payload.user_image}

    }
}) 

export const {increment, decrement, incrementByAmount, getUser} = counterSlice.actions

export default counterSlice.reducer