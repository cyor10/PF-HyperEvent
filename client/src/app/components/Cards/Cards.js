import React from 'react'
import Card from '../Card/Card'

export default function Cards({ props }) {
  return (
    <div className='grid mx-auto pb-10 pt-6 md:grid-cols-2 gap-6 w-full justify-center lg:grid-cols-3'>
      {props.length !== 0 ? props.map((event, index) => <Card key={index} props={{ event, index }}></Card>) : null}
    </div>
  )
}
