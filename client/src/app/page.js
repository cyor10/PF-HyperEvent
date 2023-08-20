'use client'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux/'
import {increment, decrement, incrementByAmount} from '../redux/features/counter/counterSlice'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'

export default function LandingPage() {
  //const count  = useSelector(state => state.counter.value)
  //const dispatch = useDispatch()

  const styles ="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md"
  
  return (
    <div className="flex min-h-screen w-full flex-col items-center">

      <div className='pb-10 bg-white w-full flex justify-center min-h-ful'>
        <h1 className='text-6xl pt-7 '>Hyper Events</h1>
      </div>

      <div className='w-full h-80 pb-25 bg-slate-950 flex justify-center items-center relative'>
        <h3 className='text-white'>IMG</h3>
        <div className='w-2 h-2 bg-red-500 absolute bottom-10 rounded'></div>
        <div className='w-2 h-2 bg-red-500 absolute bottom-10 left-40 rounded'></div>
        <div className='w-2 h-2 bg-red-500 absolute bottom-10 rounded right-40'></div>
      </div>

      <div className='flex flex-col justify-start w-full pl-3'>
        <h3 id='categories' className='text-2xl text-start'>categories</h3>
        <div className='flex flex-row gap-4'>
        <div className='w-20 h-20 bg-slate-950 mt-3 rounded-xl'>
          <p className='text-white'>cards</p>
        </div>

        <div className='w-20 h-20 bg-slate-950 mt-3 rounded-xl'>
          <p className='text-white'>cards</p>
        </div>

        <div className='w-20 h-20 bg-slate-950 mt-3 rounded-xl'>
          <p className='text-white'>cards</p>
        </div>

        <div className='w-20 h-20 bg-slate-950 mt-3 rounded-xl'>
          <p className='text-white'>cards</p>
        </div>
        </div>
      </div>

      <div>
        
      </div>

    
      <div className='"mt-8 flex flex-col justify-center "'>
      </div>
    </div>
    
  )
}
