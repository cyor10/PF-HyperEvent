'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getEvents, searchEvents, setSearchBar} from '@/redux/features/events/counterSlice'
import AxiosInstance from '../../../utils/axiosInstance'
import Link from 'next/link'


export default function SearchBar() {
    const [recentSearch, setRecentSearch] = useState([])
    const recomendations = ["The tour championship", "Bootcamp", "Conference"]
    const userLocation = "Buenos Aires"
    const locations = ["Las Vegas", "Minneapolis", "Nashville"]
    const categories = ["Sports", "Party", "Music"]
    const [orderFilters, setOrderFilters] = useState({
        search: "",
        category: "",
        city: "",
        filterDay: 0,
        order: ""
    })
    
    const dispatch = useDispatch()
    useEffect(() => {
        (async () => { 
            let localSearch = JSON.parse(localStorage.getItem("recentSearch")) || []
            setRecentSearch(localSearch)
            let { data } = await AxiosInstance("/events");
            // data.events = data.events.map(event => {return {...event, start_at: event.start_at.split("T")[0]}})
            dispatch(getEvents(data));
        })(); 
    }, [dispatch]);
    const handleChange = (name, value) => {
        console.log(orderFilters)
        setOrderFilters({...orderFilters,
            [name]: value
        })
    }
    const handleClick = () => {
        dispatch(searchEvents(orderFilters))
        recentSearch.push(orderFilters.search)
        localStorage.setItem("recentSearch", JSON.stringify(recentSearch))
        dispatch(setSearchBar(false))
    }
    return (
        <div className='font-figtree ml-6'>
            <div className='pt-3 flex h-10 bg-slate-50 items-center mb-4'>
                <svg className='mr-5' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M9.58329 17.5C13.9555 17.5 17.5 13.9556 17.5 9.58335C17.5 5.2111 13.9555 1.66669 9.58329 1.66669C5.21104 1.66669 1.66663 5.2111 1.66663 9.58335C1.66663 13.9556 5.21104 17.5 9.58329 17.5Z" fill="#292D32"/>
                    <path d="M17.75 18.3333C17.6 18.3333 17.45 18.275 17.3417 18.1667L15.7917 16.6167C15.5667 16.3917 15.5667 16.025 15.7917 15.7917C16.0167 15.5667 16.3833 15.5667 16.6167 15.7917L18.1667 17.3417C18.3917 17.5667 18.3917 17.9333 18.1667 18.1667C18.05 18.275 17.9 18.3333 17.75 18.3333Z" fill="#292D32"/>
                </svg>
                <input className='pl-1 leading-6 tracking-custom font-bold text-black w-60 h-10 text-2xl' type='search' placeholder='Search for anything' onChange={(event) => handleChange('search', event.target.value)} value={orderFilters.search}></input>
                <Link href="/search">
                    {orderFilters.search === "" ?  <svg onClick={handleClick} className='ml-3 cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M4 16C4 15.4477 4.44772 15 5 15H27C27.5523 15 28 15.4477 28 16C28 16.5523 27.5523 17 27 17H5C4.44772 17 4 16.5523 4 16Z" fill="#000022"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M17.2929 6.29289C17.6834 5.90237 18.3166 5.90237 18.7071 6.29289L27.7071 15.2929C28.0976 15.6834 28.0976 16.3166 27.7071 16.7071L18.7071 25.7071C18.3166 26.0976 17.6834 26.0976 17.2929 25.7071C16.9024 25.3166 16.9024 24.6834 17.2929 24.2929L25.5858 16L17.2929 7.70711C16.9024 7.31658 16.9024 6.68342 17.2929 6.29289Z" fill="#000022"/>
                    </svg> : <svg onClick={handleClick} className='ml-3 cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                            <path d="M14.4301 5.92999L20.5001 12L14.4301 18.07" stroke="#925FF0" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3.5 12H20.33" stroke="#925FF0" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    }
                </Link>
            </div>
            {orderFilters.search === "" ? <div className='w-56 h-1 ml-10 bg-black transition-all duration-300'></div> : <div className='w-56 h-1 ml-10 bg-purpleOscuro transition-all duration-300'></div>}
            <div className=' flex h-10 bg-slate-50 items-center mb-2 mt-6'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M17.1833 7.04165C16.3083 3.19165 12.95 1.45831 9.99996 1.45831C9.99996 1.45831 9.99996 1.45831 9.99162 1.45831C7.04996 1.45831 3.68329 3.18331 2.80829 7.03331C1.83329 11.3333 4.46662 14.975 6.84996 17.2666C7.73329 18.1166 8.86662 18.5416 9.99996 18.5416C11.1333 18.5416 12.2666 18.1166 13.1416 17.2666C15.525 14.975 18.1583 11.3416 17.1833 7.04165ZM9.99996 11.2166C8.54996 11.2166 7.37496 10.0416 7.37496 8.59165C7.37496 7.14165 8.54996 5.96665 9.99996 5.96665C11.45 5.96665 12.625 7.14165 12.625 8.59165C12.625 10.0416 11.45 11.2166 9.99996 11.2166Z" fill="#292D32"/>
                </svg>
                <select className='appearance-none font-bold leading-6 tracking-custom text-black ml-5 w-64 h-10 text-2xl rounded' onChange={(event) => handleChange('city', event.target.value)}>
                    <option key="userLocation">{userLocation}</option>
                    <option value="" key="All">All locations</option>
                    {locations.map((loc, index) => <option key={index}>{loc}</option>)}
                </select>
            </div>

            <div className='w-32 h-1 bg-black ml-10'></div>
            <div className=' mt-10'>
                <div className='flex mt-5'>
                    <div onClick={() => handleChange('filterDay', 1)} className={`bg-pinkChip text-fontColorChip ${orderFilters.filterDay === 1 ? " border-[1px] border-purpleOscuro": null} flex justify-center font-normal text-sm items-center h-8 cursor-pointer min-w-70 pl-2 pr-2 rounded-2xl`}>Today</div>
                    <div onClick={() => handleChange('filterDay', 2)} className={`bg-pinkChip text-fontColorChip ${orderFilters.filterDay === 2 ? " border-[1px] border-purpleOscuro": null} flex justify-center font-normal text-sm items-center h-8 cursor-pointer min-w-70 ml-2 pl-2 pr-2 rounded-2xl`}>Tomorrow</div>
                    <div onClick={() => handleChange('filterDay', 7)} className={`bg-pinkChip text-fontColorChip ${orderFilters.filterDay === 7 ? " border-[1px] border-purpleOscuro": null} flex justify-center font-normal text-sm items-center h-8 cursor-pointer min-w-70 ml-2 pl-2 pr-2 rounded-2xl`}>This weekend</div>
                </div>
                <div className='flex mt-4'>
                    {categories.map((cat, index) => <div value={orderFilters.category} onClick={() => handleChange('category', cat)} key={index} className={`bg-pinkChip ${orderFilters.category === cat ? " border-[1px] border-purpleOscuro": null} font-normal text-sm text-fontColorChip h-8 items-center cursor-pointer min-w-70 flex justify-center mr-2 pl-2 pr-2 rounded-2xl`}>{cat}</div>)}
                </div>
            </div>
            <div className='text-black mt-10'>
                <h3 className='text-xl font-bold leading-6 tracking-custom mb-5'>Recent and most popular searches</h3>
                <div className='flex items-center mb-8'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M14.6667 8.00001C14.6667 11.68 11.68 14.6667 8.00004 14.6667C4.32004 14.6667 1.33337 11.68 1.33337 8.00001C1.33337 4.32001 4.32004 1.33334 8.00004 1.33334C11.68 1.33334 14.6667 4.32001 14.6667 8.00001Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10.4733 10.12L8.40663 8.88665C8.04663 8.67332 7.7533 8.15999 7.7533 7.73999V5.00665" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h4 className='ml-2'>{recentSearch[recentSearch.length - 1]}</h4>
                </div>
                <div className='flex items-center mb-8'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M14.6667 8.00001C14.6667 11.68 11.68 14.6667 8.00004 14.6667C4.32004 14.6667 1.33337 11.68 1.33337 8.00001C1.33337 4.32001 4.32004 1.33334 8.00004 1.33334C11.68 1.33334 14.6667 4.32001 14.6667 8.00001Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10.4733 10.12L8.40663 8.88665C8.04663 8.67332 7.7533 8.15999 7.7533 7.73999V5.00665" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h4 className='ml-2'>{recentSearch[recentSearch.length - 2]}</h4>
                </div>
                {recomendations.map((rec, index) => 
                <div key={index} className='flex items-center mb-8'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M11 6.33333L8.2 9.13333L7.13333 7.53333L5 9.66666" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.66663 6.33333H11V7.66666" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6.00004 14.6667H10C13.3334 14.6667 14.6667 13.3333 14.6667 9.99999V5.99999C14.6667 2.66666 13.3334 1.33333 10 1.33333H6.00004C2.66671 1.33333 1.33337 2.66666 1.33337 5.99999V9.99999C1.33337 13.3333 2.66671 14.6667 6.00004 14.6667Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h4 className='ml-2'>{rec}</h4>
                </div>)}
            </div>
        </div>
    )
}

