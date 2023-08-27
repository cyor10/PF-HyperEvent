import React from 'react'
import Card from '../Card/Card'

export default function Cards({props}) {
  return (
    <div className='flex flex-col items-center'>
        {props.map((event, index) => <Card key={index} props={{event, index}}></Card>)}
    </div>
  )
}
