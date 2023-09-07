'use client'

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    name: "",
    user_image: "",
    email: "",
    last_name: "",
    id: "",
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {state.value += 1},
        decrement: (state) => {state.value -= 1},
        incrementByAmount: (state, action) => {state.value += action.payload},
        getUser: (state, action) => { state.name = action.payload?.name ,state.id=action.payload?.id, state.user_image = action.payload?.user_image , state.email = action.payload?.email , state.last_name = action.payload?.last_name }

    }
}) 

export const {increment, decrement, incrementByAmount, getUser} = counterSlice.actions

export default counterSlice.reducer