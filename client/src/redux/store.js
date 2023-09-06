'use client'
import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './features/counter/counterSlice'
import sliceEvents from './features/events/counterSlice'
import locationSlice from './features/location/locationSlice'

export const store =  configureStore({
  reducer: {
    counter: counterSlice,
    events: sliceEvents,
    location: locationSlice
  }
})

