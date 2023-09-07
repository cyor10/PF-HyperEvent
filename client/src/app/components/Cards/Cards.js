import React from 'react'
import Card from '../Card/Card'

export default function Cards({props}) {
  return (
    <div className='flex flex-wrap items-center w-full justify-around'>
        {props.length !== 0 ? props.map((event, index) => <Card key={index} props={{event, index}}></Card>) : <h2 className='mt-10 font-bold text-2xl flex justify-center text-black'>No results found :(</h2>}
    </div>
  )
}
