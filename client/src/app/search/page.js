'use client'
import React, { useState } from 'react'
import Pagination from '../components/SearchBar/Pagination'

export default function Search() {
    const userLocation = "Buenos Aires"
    const categorys = ["sports", "party", "music"]
    const locations = ["Bs As", "Cordoba", "Neuquen"]
    const [orderFilters, setOrderFilters] = useState({
        search: "",
        location: "",
        filterDay: 0,
        price: null,
        order: ""
    })
    const handleChange = (name, value) => {
        console.log(orderFilters)
        setOrderFilters({...orderFilters,
            [name]: value
        })
    }
  return (
    <div className='pt-20 min-h-screen bg-slate-50'>
        <div className='pt-3 flex h-10 bg-slate-50 items-center justify-center mb-4'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M9.58341 17.5C13.9557 17.5 17.5001 13.9556 17.5001 9.58335C17.5001 5.2111 13.9557 1.66669 9.58341 1.66669C5.21116 1.66669 1.66675 5.2111 1.66675 9.58335C1.66675 13.9556 5.21116 17.5 9.58341 17.5Z" fill="#292D32"/>
                <path d="M17.7499 18.3333C17.5999 18.3333 17.4499 18.275 17.3416 18.1667L15.7916 16.6167C15.5666 16.3917 15.5666 16.025 15.7916 15.7917C16.0166 15.5667 16.3832 15.5667 16.6166 15.7917L18.1666 17.3417C18.3916 17.5667 18.3916 17.9333 18.1666 18.1667C18.0499 18.275 17.8999 18.3333 17.7499 18.3333Z" fill="#292D32"/>
            </svg>
            <input className='p-2 text-gray-800 ml-4 w-64 h-10 text-2xl' type='search' placeholder='Escriba aqui' onChange={(event) => handleChange('search', event.target.value)} value={orderFilters.search}></input>
            <svg className='ml-3 cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M4 16C4 15.4477 4.44772 15 5 15H27C27.5523 15 28 15.4477 28 16C28 16.5523 27.5523 17 27 17H5C4.44772 17 4 16.5523 4 16Z" fill="#000022"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M17.2929 6.29289C17.6834 5.90237 18.3166 5.90237 18.7071 6.29289L27.7071 15.2929C28.0976 15.6834 28.0976 16.3166 27.7071 16.7071L18.7071 25.7071C18.3166 26.0976 17.6834 26.0976 17.2929 25.7071C16.9024 25.3166 16.9024 24.6834 17.2929 24.2929L25.5858 16L17.2929 7.70711C16.9024 7.31658 16.9024 6.68342 17.2929 6.29289Z" fill="#000022"/>
            </svg>
        </div>
        <div className=' flex h-10 bg-slate-50 justify-center items-center mb-4'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M17.1833 7.04165C16.3083 3.19165 12.95 1.45831 9.99996 1.45831C9.99996 1.45831 9.99996 1.45831 9.99162 1.45831C7.04996 1.45831 3.68329 3.18331 2.80829 7.03331C1.83329 11.3333 4.46662 14.975 6.84996 17.2666C7.73329 18.1166 8.86662 18.5416 9.99996 18.5416C11.1333 18.5416 12.2666 18.1166 13.1416 17.2666C15.525 14.975 18.1583 11.3416 17.1833 7.04165ZM9.99996 11.2166C8.54996 11.2166 7.37496 10.0416 7.37496 8.59165C7.37496 7.14165 8.54996 5.96665 9.99996 5.96665C11.45 5.96665 12.625 7.14165 12.625 8.59165C12.625 10.0416 11.45 11.2166 9.99996 11.2166Z" fill="#292D32"/>
            </svg>
                <select className='appearance-none font-bold leading-6 tracking-custom text-black ml-5 w-64 h-10 text-2xl rounded' onChange={(event) => handleChange('location', event.target.value)}>
                    <option key="userLocation">{userLocation}</option>
                    <option value="" key="All">All locations</option>
                    {locations.map((loc, index) => <option key={index}>{loc}</option>)}
                </select>
            </div>
        <div>
            <div className='flex mt-5 justify-center'>
                <div onClick={() => handleChange('filterDay', 7)} className='bg-slate-500 flex justify-center cursor-pointer min-w-70 ml-4 pl-2 pr-2 rounded-2xl'>Today</div>
                <div onClick={() => handleChange('filterDay', 152)} className='bg-slate-500 flex justify-center cursor-pointer min-w-70 ml-2 pl-2 pr-2 rounded-2xl'>Tomorrow</div>
                <div onClick={() => handleChange('filterDay', 356)} className='bg-slate-500 flex justify-center cursor-pointer min-w-70 ml-2 pl-2 pr-2 rounded-2xl'>This weekend</div>
            </div>
            <div className='flex mt-5 justify-center'>
                {categorys.map((cat, index) => <div value={orderFilters.category} name="category" key={index} className='bg-slate-500 cursor-pointer min-w-70 flex justify-center ml-2 pl-2 pr-2 rounded-2xl'>{cat}</div>)}
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
        <Pagination element={{pageRoute: "numPageSearch", pageCant: "5", stateRoute: "searchedEvents"}}/>
    </div>
  )
}
