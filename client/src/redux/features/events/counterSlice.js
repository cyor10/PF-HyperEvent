'use client'

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    events: [],
    allEvents: [],
    searchedEvents: [],
    auxSearchedEvents: [],
    searchBar: false,
    numPageSearch: 0,
    numPageHome: 0,
}

export const counterSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        getEvents: (state, action) => {
            state.events = action.payload.events, state.allEvents = action.payload.events, state.searchedEvents = action.payload.events, console.log(state.searchedEvents)},
        searchEvents: (state, action) =>
        {const {payload} = action 
        state.searchedEvents = state.allEvents
                .sort((a, b) => {
                if (payload.order === "alphaA") {
                    return a.event_name.localeCompare(b.event_name);
                } else if (payload.order === "alphaD") {
                    return b.event_name.localeCompare(a.event_name);
                } else if (payload.order === "DateA") {
                    return new Date(a.start_at) - new Date(b.start_at);
                } else  if(payload.order === "DateD") {
                    return new Date(b.start_at) - new Date(a.start_at);
                } else return 0
            })
            .filter(event => {
                const actualDate = new Date();
                const filterDate = actualDate.setDate(actualDate.getDate() + payload.filterDay)
                return (
                new Date(event.start_at) >= actualDate &&
                new Date(event.start_at) <= filterDate &&
                event.event_name.toLowerCase().includes(payload.search.toLowerCase()) &&
                (!payload.city || event.city === payload.city)
                )
            });
        },
        
        setSearchBar: (state, action) => {state.searchBar = action.payload},
        pagination: (state, action) => {state[action.payload.pageRoute] = action.payload.pag},
        setPagination: (state, action) => {state[action.payload.stateRoute] = action.payload.cardsSliced},
    }
}) 

export const {getEvents, searchEvents, setSearchBar, pagination, setPagination} = counterSlice.actions

export default counterSlice.reducer