'use client'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux/'
import Carousel from './components/Carousel/Carousel'
import Categories from './components/Categories/Categories'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'

export default function LandingPage() {

  const slides = [
    "https://seatgeek.com/images/performers-landscape/generic-theater-ba8841/677168/500_700.jpg",
    "https://seatgeek.com/images/performers-landscape/generic-sports-5362fd/677214/500_700.jpg",
    "https://seatgeek.com/images/performers-landscape/generic-ncaa-baseball-c5ab29/677212/500_700.jpg"
  ]

  const events = [
    "https://seatgeek.com/images/performers-landscape/the-tribes-of-da-moon-fest-72bd85/803907/huge.jpg",
    "https://seatgeek.com/images/performers-landscape/soul-glo-1f0271/512990/huge.jpg",
    "https://seatgeek.com/images/performers-landscape/fontaines-d-c-862bb0/663776/1200x525.jpg",
    "https://seatgeek.com/images/performers-landscape/william-tyler-a50c41/63653/huge.jpg",
    "https://seatgeek.com/images/performers-landscape/john-mayer-70d9e4/978/1200x525.jpg",
  ]
  
  return (
    <div className="flex min-h-screen w-full flex-col items-center">

      <div className='pb-10 bg-white w-full flex justify-center min-h-ful'>
        <h1 className='text-6xl pt-7 text-black'>Hyper Events</h1>
      </div>

      <Carousel>
      {events && events.map((ev) => (
          <Image className='w-96 h-96 object-cover' src={ev} alt="Descripción de la imagen" width={900} height={300} key={ev} />
      ))}
    </Carousel>


      <div className='flex flex-col justify-start w-full pt-3'> 
      <h2 className='text-xl pl-3 pb-3'>Categories</h2>
        <Categories>
          {slides && slides.map((sl) => (
            <Image className='w-[5.3rem] h-[5.3rem] rounded-md' src={sl} width={400} height={200} key={sl}></Image>
          ))}
        </Categories>
      </div>

      <div>
        
      </div>

    
      <div className='"mt-8 flex flex-col justify-center "'>
      </div>
    </div>
    
  )
}
