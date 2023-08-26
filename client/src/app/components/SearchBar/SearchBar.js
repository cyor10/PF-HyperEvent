'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getEvents, searchEvents} from '@/redux/features/events/counterSlice'
import Pagination from './Pagination'
import AxiosInstance from '../../../utils/axiosInstance'


export default function SearchBar() {
    let recentSearch = []
    if(typeof window !== "undefined") {
        recentSearch = JSON.parse(localStorage.getItem("recentSearch")) || []
    }
    const recomendations = ["The tour championship", "Bootcamp", "Conference"]
    const userLocation = "Buenos Aires"
    const locations = ["Bs As", "Cordoba", "Neuquen"]
    const categorys = ["MMA", "WWE", "Golf"]
    const [searchBool, setSearchBool] = useState(false)
    const [orderFilters, setOrderFilters] = useState({
        search: "",
        location: "",
        filterDay: 0,
        price: null,
        order: ""
    })
    
    const dispatch = useDispatch()
    useEffect(() => {
        (async () => { 
            let { data } = await AxiosInstance("/events");
            data.events = data.events.map(event => {return {...event, start_at: event.start_at.split("T")[0]}})
            dispatch(getEvents(data));
        })(); 
    }, []);
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
        searchBool === false ? setSearchBool(true) : null
    }
    return (
        <div>
            <div className='pt-3 flex h-10 bg-slate-50 items-center mb-4'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M13.6133 2.35194C12.5679 1.2992 11.2519 0.5598 9.81253 0.216437C8.37319 -0.126926 6.86728 -0.0607092 5.46321 0.40768C4.05915 0.87607 2.81231 1.72816 1.86216 2.86865C0.912003 4.00913 0.296 5.39304 0.0830499 6.86558C-0.1299 8.33812 0.0685992 9.84122 0.656347 11.2068C1.24409 12.5723 2.19791 13.7464 3.41111 14.5978C4.62432 15.4492 6.04906 15.9443 7.526 16.0277C9.00293 16.1111 10.4738 15.7795 11.7741 15.07L16.5515 19.6357C16.8007 19.8735 17.1323 20.0042 17.4757 19.9999C17.8192 19.9956 18.1475 19.8567 18.3907 19.6127L19.6169 18.3793C19.8623 18.131 20 17.795 20 17.4449C20 17.0947 19.8623 16.7588 19.6169 16.5105L14.9809 11.8384C15.7997 10.3201 16.1089 8.57626 15.8624 6.86681C15.616 5.15737 14.8271 3.57376 13.6133 2.35194ZM11.2453 11.3065C10.5993 11.9567 9.77605 12.3996 8.87976 12.5791C7.98346 12.7586 7.05437 12.6667 6.21001 12.315C5.36564 11.9633 4.64393 11.3676 4.13615 10.6033C3.62837 9.83893 3.35734 8.94027 3.35734 8.02095C3.35734 7.10164 3.62837 6.20298 4.13615 5.43863C4.64393 4.67428 5.36564 4.07858 6.21001 3.72688C7.05437 3.37518 7.98346 3.28328 8.87976 3.4628C9.77605 3.64232 10.5993 4.0852 11.2453 4.73541C12.1092 5.60806 12.5942 6.78943 12.5942 8.02095C12.5942 9.25248 12.1092 10.4338 11.2453 11.3065Z" fill="#BBBFC4"/>
                </svg>
                <input className='p-2 text-gray-800 ml-4 w-64 h-10 text-2xl' type='search' placeholder='Escriba aqui' onChange={(event) => handleChange('search', event.target.value)} value={orderFilters.search}></input>
                <svg onClick={handleClick} className='ml-3 cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M4 16C4 15.4477 4.44772 15 5 15H27C27.5523 15 28 15.4477 28 16C28 16.5523 27.5523 17 27 17H5C4.44772 17 4 16.5523 4 16Z" fill="#000022"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M17.2929 6.29289C17.6834 5.90237 18.3166 5.90237 18.7071 6.29289L27.7071 15.2929C28.0976 15.6834 28.0976 16.3166 27.7071 16.7071L18.7071 25.7071C18.3166 26.0976 17.6834 26.0976 17.2929 25.7071C16.9024 25.3166 16.9024 24.6834 17.2929 24.2929L25.5858 16L17.2929 7.70711C16.9024 7.31658 16.9024 6.68342 17.2929 6.29289Z" fill="#000022"/>
                </svg>
            </div>
            <div className=' ml-6 flex h-10 bg-slate-50 items-center mb-4'>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="20" viewBox="0 0 14 20" fill="none">
                    <path d="M6.99991 0C3.17296 0 0.0595703 3.11385 0.0595703 6.94089C0.0595703 10.6247 6.35666 19.2316 6.62478 19.596L6.87502 19.9366C6.90428 19.9766 6.95088 20 6.99991 20C7.04969 20 7.09599 19.9766 7.12555 19.9366L7.37564 19.596C7.64391 19.2316 13.9408 10.6247 13.9408 6.94089C13.9408 3.11385 10.827 0 6.99991 0ZM6.99991 4.45468C8.37111 4.45468 9.48612 5.56973 9.48612 6.94089C9.48612 8.31134 8.37106 9.4271 6.99991 9.4271C5.62951 9.4271 4.51369 8.31134 4.51369 6.94089C4.51369 5.56973 5.62946 4.45468 6.99991 4.45468Z" fill="black"/>
                </svg>
                <select className='p-2 text-gray-800 ml-4 w-64 h-10 text-xl rounded bg-slate-200' onChange={(event) => handleChange('location', event.target.value)}>
                    <option key="userLocation">{userLocation}</option>
                    <option value="" key="All">All locations</option>
                    {locations.map((loc, index) => <option key={index}>{loc}</option>)}
                </select>
            </div>
            <div>
                <div className='flex mt-5'>f
                    <div onClick={() => handleChange('filterDay', 7)} className='bg-slate-500 cursor-pointer ml-4 pl-2 pr-2 rounded-lg'>7 Days</div>
                    <div onClick={() => handleChange('filterDay', 152)} className='bg-slate-500 cursor-pointer ml-2 pl-2 pr-2 rounded-lg'>5 Months</div>
                    <div onClick={() => handleChange('filterDay', 356)} className='bg-slate-500 cursor-pointer ml-2 pl-2 pr-2 rounded-lg'>1 Year</div>
                </div>
                <div className='flex mt-2'>
                    <div onClick={handleChange} value={orderFilters.price} name="price" className='bg-slate-500 cursor-pointer ml-4 pl-2 pr-2 rounded-lg'>Free</div>
                </div>
                <div className='flex mt-2'>
                    {categorys.map((cat, index) => <div value={orderFilters.category} name="category" key={index} className='bg-slate-500 cursor-pointer min-w-60 flex justify-center ml-2 pl-2 pr-2 rounded-lg'>{cat}</div>)}
                </div>
            </div>
            <div className='flex mt-4 justify-center'>
                <select className='text-slate-700 mr-3 w-32 rounded-md bg-slate-300' onChange={(event) => handleChange('order', event.target.value)} value={orderFilters.order}>
                    <option value="">Order by alphabetically</option>
                    <option value="alphaA">Ascending</option>
                    <option value="alphaD">descending</option>
                </select>
                <select className='text-slate-700 ml-3 w-32 rounded-md bg-slate-300' onChange={(event) => handleChange('order', event.target.value)} value={orderFilters.order}>
                    <option value="">Order by date</option>
                    <option value="DateA">Newer</option>
                    <option value="DateD">Lastest</option>
                </select>
            </div>
            <div className='text-gray-800 mt-7'>
                <h3 className='text-xl font-bold'>Recent and most popular searches</h3>
                {recentSearch.reverse().map((search, index) => index >= recentSearch.length - 3 ? 
                <div key={index} className='flex ml-4 items-center mt-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M14.6667 8.00001C14.6667 11.68 11.68 14.6667 8.00004 14.6667C4.32004 14.6667 1.33337 11.68 1.33337 8.00001C1.33337 4.32001 4.32004 1.33334 8.00004 1.33334C11.68 1.33334 14.6667 4.32001 14.6667 8.00001Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10.4733 10.12L8.40663 8.88665C8.04663 8.67332 7.7533 8.15999 7.7533 7.73999V5.00665" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <h4 className='ml-2'>{search}</h4>
                </div>: null)}
                {recomendations.map((rec, index) => 
                <div key={index} className='flex ml-4 items-center mt-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M11 6.33333L8.2 9.13333L7.13333 7.53333L5 9.66666" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9.66663 6.33333H11V7.66666" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6.00004 14.6667H10C13.3334 14.6667 14.6667 13.3333 14.6667 9.99999V5.99999C14.6667 2.66666 13.3334 1.33333 10 1.33333H6.00004C2.66671 1.33333 1.33337 2.66666 1.33337 5.99999V9.99999C1.33337 13.3333 2.66671 14.6667 6.00004 14.6667Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <h4 className='ml-2'>{rec}</h4>
                </div>)}
            </div>
            {searchBool === true ? <Pagination element={{pageRoute: "numPageSearch", pageCant: "5", stateRoute: "searchedEvents"}}/> : null}
        </div>
    )
}
