'use client'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getEvents, searchEvents, setSearchBar} from '@/redux/features/events/counterSlice'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import AxiosInstance from '../../../utils/axiosInstance'


export default function SearchBar() {
    const [searchBool, setSearchBool] = useState(false)
    const [orderFilters, setOrderFilters] = useState({
        search: "",
        filterDay: 0,
        price: null,
        order: ""
    })

    const dispatch = useDispatch()
    const eventsRedux = useSelector(state => state.events)
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
        searchBool === false ? setSearchBool(true) : null
    }
    return (
        <div>
            <div className='pt-14 flex h-10 bg-slate-50 items-center mb-10'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M13.6133 2.35194C12.5679 1.2992 11.2519 0.5598 9.81253 0.216437C8.37319 -0.126926 6.86728 -0.0607092 5.46321 0.40768C4.05915 0.87607 2.81231 1.72816 1.86216 2.86865C0.912003 4.00913 0.296 5.39304 0.0830499 6.86558C-0.1299 8.33812 0.0685992 9.84122 0.656347 11.2068C1.24409 12.5723 2.19791 13.7464 3.41111 14.5978C4.62432 15.4492 6.04906 15.9443 7.526 16.0277C9.00293 16.1111 10.4738 15.7795 11.7741 15.07L16.5515 19.6357C16.8007 19.8735 17.1323 20.0042 17.4757 19.9999C17.8192 19.9956 18.1475 19.8567 18.3907 19.6127L19.6169 18.3793C19.8623 18.131 20 17.795 20 17.4449C20 17.0947 19.8623 16.7588 19.6169 16.5105L14.9809 11.8384C15.7997 10.3201 16.1089 8.57626 15.8624 6.86681C15.616 5.15737 14.8271 3.57376 13.6133 2.35194ZM11.2453 11.3065C10.5993 11.9567 9.77605 12.3996 8.87976 12.5791C7.98346 12.7586 7.05437 12.6667 6.21001 12.315C5.36564 11.9633 4.64393 11.3676 4.13615 10.6033C3.62837 9.83893 3.35734 8.94027 3.35734 8.02095C3.35734 7.10164 3.62837 6.20298 4.13615 5.43863C4.64393 4.67428 5.36564 4.07858 6.21001 3.72688C7.05437 3.37518 7.98346 3.28328 8.87976 3.4628C9.77605 3.64232 10.5993 4.0852 11.2453 4.73541C12.1092 5.60806 12.5942 6.78943 12.5942 8.02095C12.5942 9.25248 12.1092 10.4338 11.2453 11.3065Z" fill="#BBBFC4"/>
                </svg>
                <input className='p-2 text-gray-800 ml-4 w-64 h-12 text-2xl' type='search' placeholder='Escriba aqui' onChange={(event) => handleChange('search', event.target.value)} value={orderFilters.search}></input>
                <svg onClick={handleClick} className='ml-3 cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M4 16C4 15.4477 4.44772 15 5 15H27C27.5523 15 28 15.4477 28 16C28 16.5523 27.5523 17 27 17H5C4.44772 17 4 16.5523 4 16Z" fill="#000022"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M17.2929 6.29289C17.6834 5.90237 18.3166 5.90237 18.7071 6.29289L27.7071 15.2929C28.0976 15.6834 28.0976 16.3166 27.7071 16.7071L18.7071 25.7071C18.3166 26.0976 17.6834 26.0976 17.2929 25.7071C16.9024 25.3166 16.9024 24.6834 17.2929 24.2929L25.5858 16L17.2929 7.70711C16.9024 7.31658 16.9024 6.68342 17.2929 6.29289Z" fill="#000022"/>
                </svg>
            </div>
            {searchBool ? <div className=''>
                {eventsRedux.events.map(element => (
                    <Link href="/detail/[name]" as={`/detail/${element.event_name}`} key={element.id} onClick={() => dispatch(setSearchBar(false))}>
                        <div className='mt-10'>
                            <img src={element.event_image} alt={element.event_name}></img>
                            <h3 className='text-slate-800'>{element.event_name}</h3>
                        </div>
                    </Link> ))
                }
            </div> : null}
            <div>
                <div className='flex mt-5'>f
                    <h2 className=' text-slate-700'>Filters:</h2>
                    <div onClick={() => handleChange('filterDay', 7)} className='bg-slate-500 cursor-pointer ml-4 pl-2 pr-2 rounded-lg'>7 Days</div>
                    <div onClick={() => handleChange('filterDay', 152)} className='bg-slate-500 cursor-pointer ml-2 pl-2 pr-2 rounded-lg'>5 Months</div>
                    <div onClick={() => handleChange('filterDay', 356)} className='bg-slate-500 cursor-pointer ml-2 pl-2 pr-2 rounded-lg'>1 Year</div>
                </div>
                <div className='flex mt-2'>
                    <h2 className=' text-slate-700'>Price:</h2>
                    <div onClick={handleChange} value={orderFilters.price} name="price" className='bg-slate-500 cursor-pointer ml-4 pl-2 pr-2 rounded-lg'>Free</div>
                </div>
                <div className='flex mt-2'>
                    <h2 className=' text-slate-700'>Category:</h2>
                    <div value={orderFilters.category} name="category" className='bg-slate-500 cursor-pointer ml-4 pl-2 pr-2 rounded-lg'>MMA</div>
                    <div value={orderFilters.category} name="category" className='bg-slate-500 cursor-pointer ml-2 pl-2 pr-2 rounded-lg'>WWE</div>
                    <div value={orderFilters.category} name="category" className='bg-slate-500 cursor-pointer ml-2 pl-2 pr-2 rounded-lg'>Golf</div>
                </div>category
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
        </div>
    )
}
