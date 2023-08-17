'use client'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux/'
import {increment, decrement, incrementByAmount} from '../redux/features/counter/counterSlice'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'

export default function LandingPage() {
  const count  = useSelector(state => state.counter.value)
  const dispatch = useDispatch()

  const styles ="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md"
  

  
  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-3 p-24 ">
      <Link href='/login' className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'>Login</Link>
      <div className='"mt-8 flex flex-col justify-center "'>
      <button className={styles} onClick={() => dispatch(increment())}>
        increment
      </button>
      <span>
        {count}
      </span>
      <button className={styles} onClick={() => dispatch(decrement())}>
        decrement
      </button>
      </div>
    </main>
    
  )
}
