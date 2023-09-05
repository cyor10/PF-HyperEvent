'use client'

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import AxiosInstance from '../../../utils/axiosInstance'

const initialState = {
    searchedEvents: [],
    coincidence: true,
    status: 'idle',
    numPageSearch: 0,
    numPageHome: 0,
}

export const fetchSearchData = createAsyncThunk(
    'search',
    async (queryParams) => {
        // Build the URL with the query parameters.
        const queryString = new URLSearchParams(queryParams).toString();
        const url = `/events/search?${queryString}`;

        const response = await AxiosInstance(url);
        return response.data;
    }
);

export const counterSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        pagination: (state, action) => { state[action.payload.pageRoute] = action.payload.pag },
        setPagination: (state, action) => { state[action.payload.stateRoute] = action.payload.cardsSliced },
        clearSearchedEvents: (state) => {
            state.searchedEvents = [], state.coincidence = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSearchData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.searchedEvents = action.payload;

                if (action.payload.length === 0) {
                    state.coincidence = false;
                } else {
                    state.coincidence = true;
                }
            })
            .addCase(fetchSearchData.rejected, (state) => {
                state.status = 'failed';
            });
    }
})

export const { pagination, setPagination, clearSearchedEvents } = counterSlice.actions

export default counterSlice.reducer