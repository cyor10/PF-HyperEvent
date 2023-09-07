import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchSearchData } from '@/redux/features/events/counterSlice'

export default function RecentSearch({ orderFilters, setOrderFilters }) {
    const recomendations = ["Active tournaments", "Upcoming soccer matches", "Entertainment this weekend"]
    const [recentSearch, setRecentSearch] = useState([])

    const dispatch = useDispatch()
    useEffect(() => {
        (async () => {
            let localSearch = JSON.parse(localStorage.getItem("recentSearch")) || []
            setRecentSearch(localSearch)
        })();
    }, [dispatch]);

    const handleClick = (index) => {
        const updatedOrderFilters = { ...orderFilters };

        if (index === 0) {
            updatedOrderFilters.word = 'Tournament';
        }
        if (index === 1) {
            updatedOrderFilters.word = 'Soccer'
        }
        if (index === 2) {
            updatedOrderFilters.start = 'Weekend',
                updatedOrderFilters.category = 'Entertainment'
        }

        setOrderFilters(updatedOrderFilters);
        dispatch(fetchSearchData(updatedOrderFilters))
    };

    const handleRecentSearch = (search) => {
        setOrderFilters(search);
        dispatch(fetchSearchData(search));
    };

    return (
        <div className='text-black mt-8 ml-6'>
            <h3 className='text-2xl font-bold leading-6 tracking-custom mb-5'>Recent and most popular searches</h3>
            {recentSearch.map((search, index) => (
                <div key={index} className='flex items-center mb-8'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M14.6667 8.00001C14.6667 11.68 11.68 14.6667 8.00004 14.6667C4.32004 14.6667 1.33337 11.68 1.33337 8.00001C1.33337 4.32001 4.32004 1.33334 8.00004 1.33334C11.68 1.33334 14.6667 4.32001 14.6667 8.00001Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10.4733 10.12L8.40663 8.88665C8.04663 8.67332 7.7533 8.15999 7.7533 7.73999V5.00665" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <h4 className='ml-2 cursor-pointer' onClick={() => handleRecentSearch(search)}>
                        {Object.keys(search)
                            .filter((key) => search[key])
                            .map((key) => `${search[key]}`)
                            .join(', ')}</h4>
                </div>
            ))}
            {recomendations.map((rec, index) =>
                <div key={index} className='flex items-center mb-8'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M11 6.33333L8.2 9.13333L7.13333 7.53333L5 9.66666" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9.66663 6.33333H11V7.66666" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6.00004 14.6667H10C13.3334 14.6667 14.6667 13.3333 14.6667 9.99999V5.99999C14.6667 2.66666 13.3334 1.33333 10 1.33333H6.00004C2.66671 1.33333 1.33337 2.66666 1.33337 5.99999V9.99999C1.33337 13.3333 2.66671 14.6667 6.00004 14.6667Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <h4 className='ml-2 cursor-pointer' onClick={() => handleClick(index)}>{rec}</h4>
                </div>)}
        </div>
    )
}
