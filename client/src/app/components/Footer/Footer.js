"use client"
import React from 'react'
import { IconArrow, IconFacebook, IconIg, IconTwitter } from '@/utils/svg/svg'
import { useParams, usePathname } from 'next/navigation'
import Link from 'next/link'
export default function Footer() {
  const {name, price} = useParams()
  const pathname = usePathname()
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Desplazamiento suave al principio
  };
  return (name?.length > 0 || price?.length > 0 || pathname === "/payment/" || pathname === "/create_event" || pathname === "/create_event/form_step_1" || pathname === "/create_event/form_step_2" || pathname === "/create_event/form_step_3") ? null : (
    <footer className='bg-[#000] text-white h-[100%] flex flex-row justify-between p-6'>
      <div className='flex flex-col gap-3'>
        <Link href='/about'>
          <h3 className='font-bold'>ABOUT US</h3>
        </Link>
        <h3 className='font-bold'>CONTACT</h3>
        <Link href='/create_events'>
          <h3 className='font-bold'>CREATE</h3>
        </Link>
        <Link href='/search'>
          <h3 className='font-bold'>SEARCH</h3>
        </Link>
      </div>

      <div className='flex flex-col gap-4 text-center items-center relative bottom-5'>
        <div className='w-28 h-[4rem]'>

        <img className='w-28 h-20' src='https://res.cloudinary.com/hyperevents/image/upload/v1693173297/eaa18030c4d08143afa9c965bd38bff8_zud8ee.png' alt='cloudinary-image'></img>
        </div>
        <div className='flex justify-evenly gap-2'>
          <IconFacebook/>
          <IconIg/>
          <IconTwitter/>
        </div>
        <div
          className='bg-purpleOscuro w-12 h-12 flex justify-center items-center rounded-full'
          onClick={handleScrollToTop}
        >
          <IconArrow />

        </div>
      </div>
    </footer>
   );
  }