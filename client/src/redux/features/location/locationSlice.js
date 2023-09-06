'use client'

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import AxiosInstance from '../../../utils/axiosInstance'

export const getStates = createAsyncThunk(
    'location/getStates',
    async (countryName) => {
        try {
            const response = await AxiosInstance(`/states/?country=${countryName}`);
            return response.data;
        } catch (error) {
            console.log(error)
        }
    });

export const getCities = createAsyncThunk(
    'location/getCities',
    async (stateName) => {
        try {
            const response = await AxiosInstance(`/cities/?state=${stateName}`);
            return response.data;
        } catch (error) {
            console.log(error)
        }
    });

const locationSlice = createSlice({
    name: 'location',
    initialState: {
        states: [],
        cities: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getStates.fulfilled, (state, action) => {
                state.states = action.payload;
            })
            .addCase(getCities.fulfilled, (state, action) => {
                state.cities = action.payload;
            })
    },
});

export default locationSlice.reducer;