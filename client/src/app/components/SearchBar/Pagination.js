import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { pagination } from '../../../redux/features/events/counterSlice'
import Cards from '../Cards/Cards'

export default function Pagination( params ) {
    const dispatch = useDispatch()
    const {pageRoute, pageCant, stateRoute} = params.element
    const reduxEvents = useSelector(state => state.events)
    const cardsPerPage = pageCant
    const pages = Math.ceil(reduxEvents[stateRoute].length / cardsPerPage)
    const buttonPages = Array.from({length: pages}, (_,i) => i)
    const events = reduxEvents[stateRoute]?.slice((reduxEvents[pageRoute]*cardsPerPage), (reduxEvents[pageRoute]+1)*cardsPerPage)

    const handlePagination = (pag) => {
        dispatch(pagination({pag, pageRoute}))
    }
  return (
    <>
        <div className='flex text-slate-800 justify-center mt-4'>
            {reduxEvents[pageRoute] > 0 ? <div onClick={() => handlePagination(reduxEvents[pageRoute]-1)} className='cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 25" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3 12.5C3 12.0858 3.33579 11.75 3.75 11.75H20.25C20.6642 11.75 21 12.0858 21 12.5C21 12.9142 20.6642 13.25 20.25 13.25H3.75C3.33579 13.25 3 12.9142 3 12.5Z" fill="#000022"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.0303 5.21967C11.3232 5.51256 11.3232 5.98744 11.0303 6.28033L4.81066 12.5L11.0303 18.7197C11.3232 19.0126 11.3232 19.4874 11.0303 19.7803C10.7374 20.0732 10.2626 20.0732 9.96967 19.7803L3.21967 13.0303C2.92678 12.7374 2.92678 12.2626 3.21967 11.9697L9.96967 5.21967C10.2626 4.92678 10.7374 4.92678 11.0303 5.21967Z" fill="#000022"/>
                </svg>
            </div>: null}
            {reduxEvents[pageRoute] > 2 && <div className='ml-2'>. . .</div>}
            {buttonPages.map(pag => {
                if(pag >= reduxEvents[pageRoute] - 2 && pag <= reduxEvents[pageRoute] + 2) return(<h3 onClick={() => handlePagination(pag)} className={`cursor-pointer mr-2 ml-2 ${pag === reduxEvents[pageRoute] ? "bg-slate-500" : "bg-slate-300"} w-7 flex justify-center rounded`} key={pag}>{pag + 1}</h3>
                )})}
            {reduxEvents[pageRoute] < buttonPages.length - 3 && <div className='mr-2'>. . .</div>}
            {reduxEvents[pageRoute] < buttonPages.length - 1 ? <div onClick={() => handlePagination(reduxEvents[pageRoute]+1)} className='cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 25" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3 12.5C3 12.0858 3.33579 11.75 3.75 11.75H20.25C20.6642 11.75 21 12.0858 21 12.5C21 12.9142 20.6642 13.25 20.25 13.25H3.75C3.33579 13.25 3 12.9142 3 12.5Z" fill="#000022"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.9697 5.21967C13.2626 4.92678 13.7374 4.92678 14.0303 5.21967L20.7803 11.9697C21.0732 12.2626 21.0732 12.7374 20.7803 13.0303L14.0303 19.7803C13.7374 20.0732 13.2626 20.0732 12.9697 19.7803C12.6768 19.4874 12.6768 19.0126 12.9697 18.7197L19.1893 12.5L12.9697 6.28033C12.6768 5.98744 12.6768 5.51256 12.9697 5.21967Z" fill="#000022"/>
                </svg>
            </div> : null}
        </div>
        <Cards props={events}/>
    </>
  )
}