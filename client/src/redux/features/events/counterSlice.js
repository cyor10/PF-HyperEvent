'use client'

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    events: {},
    allEvents: {},
    searchBar: false,
}

export const counterSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        getEvents: (state, action) => {state.events = action.payload.events, state.allEvents = action.payload.events, console.log(state.allEvents)},
        searchEvents: (state, action) =>
        {const {payload} = action 
        state.events = state.allEvents 
            .sort((a, b) => {
                if (payload.order === "alphaA") {
                    return a.event_name.localeCompare(b.event_name);
                } else if (payload.order === "alphaB") {
                    return b.event_name.localeCompare(a.event_name);
                } else if (payload.order === "dateA") {
                    return new Date(a.start_at) - new Date(b.start_at);
                } else {
                    return new Date(b.start_at) - new Date(a.start_at);
                }
            })
            .filter(event => {
                const actualDate = new Date();
                const filterDate = actualDate.setDate(actualDate.getDate() - payload.filterDay)
                return event.event_name.toLowerCase().includes(payload.search.toLowerCase()) &&
                (payload.filterDay <= 0 || new Date(event.start_at) >= new Date(filterDate))
            });
        },
        setSearchBar: (state, action) => {state.searchBar = action.payload},
    }
}) 

export const {getEvents, searchEvents, setSearchBar} = counterSlice.actions

export default counterSlice.reducer