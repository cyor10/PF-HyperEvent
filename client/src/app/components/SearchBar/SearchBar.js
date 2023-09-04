'use client'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSearchData } from '@/redux/features/events/counterSlice'
import Pagination from './Pagination'
import RecentSearch from './RecentSearch'
import EmptyState from './EmptyState'


export default function SearchBar() {
    const reduxEvents = useSelector(state => state.events)
    const dispatch = useDispatch()

    const locations = ["Las Vegas", "Chicago", "Nashville"]
    const possibleDays = ["today", "tomorrow", "weekend"]
    const categories = ["Sports", "Theater", "Concerts"]
    const [orderFilters, setOrderFilters] = useState({
        word: "",
        city: "",
        start: "",
        category: "",
        sort: "",
        date: ""
    })

    const handleChange = (name, value) => {
        setOrderFilters({
            ...orderFilters,
            [name]: value
        });

        const updatedFilters = { ...orderFilters };

        // If the value is a string and the name is 'start', convert to lowercase
        if (typeof value === 'string' && name === 'start') {
            updatedFilters[name] = value.toLowerCase();
        } else {
            updatedFilters[name] = value;
        }

        // Check if it is updating 'sort' or 'date'
        if (name === 'sort') {
            // if it is updated 'sort', establishes 'date' empty
            updatedFilters['date'] = '';
        } else if (name === 'date') {
            // if it is updated 'date', establishes 'sort' empty
            updatedFilters['sort'] = '';
        }

        // Filter the fields that contain information.
        const filtersWithValues = Object.keys(updatedFilters).reduce((acc, key) => {
            if (updatedFilters[key]) {
                acc[key] = updatedFilters[key];
            }
            return acc;
        }, {});

        // Update status and dispatch action with updated filters
        setOrderFilters(updatedFilters);
        dispatch(fetchSearchData(filtersWithValues));
    }

    return (
        <div className='font-figtree ml-6'>
            <div className='pt-3 flex h-10 bg-slate-50 items-center mb-4'>
                <svg className='mr-5' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M9.58329 17.5C13.9555 17.5 17.5 13.9556 17.5 9.58335C17.5 5.2111 13.9555 1.66669 9.58329 1.66669C5.21104 1.66669 1.66663 5.2111 1.66663 9.58335C1.66663 13.9556 5.21104 17.5 9.58329 17.5Z" fill="#292D32" />
                    <path d="M17.75 18.3333C17.6 18.3333 17.45 18.275 17.3417 18.1667L15.7917 16.6167C15.5667 16.3917 15.5667 16.025 15.7917 15.7917C16.0167 15.5667 16.3833 15.5667 16.6167 15.7917L18.1667 17.3417C18.3917 17.5667 18.3917 17.9333 18.1667 18.1667C18.05 18.275 17.9 18.3333 17.75 18.3333Z" fill="#292D32" />
                </svg>
                <input className='pl-1 leading-6 tracking-custom font-bold text-black w-60 h-10 text-2xl' type='search' placeholder='Search for anything' onChange={(event) => handleChange('word', event.target.value)} value={orderFilters.word}></input>
            </div>
            {orderFilters.word === "" ? <div className='w-56 h-1 ml-10 bg-black transition-all duration-300'></div> : <div className='w-56 h-1 ml-10 bg-purpleOscuro transition-all duration-300'></div>}
            <div className=' flex h-10 bg-slate-50 items-center mb-2 mt-6'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M17.1833 7.04165C16.3083 3.19165 12.95 1.45831 9.99996 1.45831C9.99996 1.45831 9.99996 1.45831 9.99162 1.45831C7.04996 1.45831 3.68329 3.18331 2.80829 7.03331C1.83329 11.3333 4.46662 14.975 6.84996 17.2666C7.73329 18.1166 8.86662 18.5416 9.99996 18.5416C11.1333 18.5416 12.2666 18.1166 13.1416 17.2666C15.525 14.975 18.1583 11.3416 17.1833 7.04165ZM9.99996 11.2166C8.54996 11.2166 7.37496 10.0416 7.37496 8.59165C7.37496 7.14165 8.54996 5.96665 9.99996 5.96665C11.45 5.96665 12.625 7.14165 12.625 8.59165C12.625 10.0416 11.45 11.2166 9.99996 11.2166Z" fill="#292D32" />
                </svg>
                <select className='appearance-none font-bold leading-6 tracking-custom text-black ml-5 w-64 h-10 text-2xl rounded' defaultValue="All locations" onChange={(event) => handleChange('city', event.target.value)}>
                    <option disabled hidden>All locations</option>
                    {locations.map((loc, index) => <option key={index}>{loc}</option>)}
                </select>
            </div>

            <div className='w-32 h-1 bg-black ml-10'></div>
            <div className=' mt-10'>
                <div className='flex mt-5'>
                    {possibleDays.map((day, index) => <div value={orderFilters.start} onClick={() => handleChange('start', day)} key={index} className={`bg-pinkChip ${orderFilters.start === day ? " border-[1px] border-purpleOscuro" : null} font-normal text-sm text-fontColorChip h-8 items-center cursor-pointer min-w-70 flex justify-center mr-2 pl-2 pr-2 rounded-2xl`}>{day}</div>)}
                </div>
                <div className='flex mt-4'>
                    {categories.map((cat, index) => <div value={orderFilters.category} onClick={() => handleChange('category', cat)} key={index} className={`bg-pinkChip ${orderFilters.category === cat ? " border-[1px] border-purpleOscuro" : null} font-normal text-sm text-fontColorChip h-8 items-center cursor-pointer min-w-70 flex justify-center mr-2 pl-2 pr-2 rounded-2xl`}>{cat}</div>)}
                </div>
            </div>

            {reduxEvents.searchedEvents?.length !== 0 ?
                <div>
                    <div className='mt-8'>
                        <h3 className='font-bold leading-6 tracking-custom text-black w-64 h-10 text-xl'>Most popular matches</h3>
                    </div>
                    <div className='flex justify-center mt-1'>
                        <select className='pl-2 pr-2 appearance-none flex text-fontColorChip mr-3 h-8 rounded-2xl bg-pinkChip' onChange={(event) => handleChange('sort', event.target.value)} value={orderFilters.sort}>
                            <option value="" disabled>Order by alphabetically</option>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                        <select className='flex appearance-none text-fontColorChip ml-3 h-8 w-40 rounded-2xl bg-pinkChip pl-6' onChange={(event) => handleChange('date', event.target.value)} value={orderFilters.date}>
                            <option value="" disabled>Order by date</option>
                            <option value="newer">Newer</option>
                            <option value="latest">Latest</option>
                        </select>
                    </div>
                    <Pagination element={{ pageRoute: "numPageSearch", pageCant: "5", stateRoute: "searchedEvents" }} /></div>
                : reduxEvents.coincidence === false ?
                    <EmptyState/> : <RecentSearch />
            }
        </div>
    )
}
