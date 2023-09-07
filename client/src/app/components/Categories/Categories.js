"use client"

import { React, useState, useEffect, useRef } from 'react'
import { motion } from "framer-motion"
import Image from 'next/image'
import Link from 'next/link'

export default function Categories({ categories }) {

  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  })

  return (
    <motion.div ref={carousel} className='cursor-grab overflow-hidden'>
      <motion.div drag="x" dragConstraints={{ right: 0, left: -width }} className='flex'>
        {categories.map((category, index) => {
          return (
            <motion.div key={index} className=' h-[clamp(7rem,15vw,9.7rem)] w-[clamp(7rem,15vw,9.7rem)] p-[min(2%,0.8rem)] flex-col align-middle justify-center shrink-0'>
              <Link
                href='/events'
                as={`/events/${category.name}`}>
                <Image
                  src={category.image}
                  className='w-[90%] h-[90%] object-cover rounded-[1rem] justify-center ml-1'
                  alt={category.name}
                  width={200}
                  height={200}
                />
                <p className='w-[100%] h-[20%] font-figtree text-center text-sm'>
                  {category.name}
                </p>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>
    </motion.div>
  );
}
