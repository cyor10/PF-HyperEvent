"use client"
import React from 'react'
import { IconArrow, IconFacebook, IconIg, IconTwitter } from '@/utils/svg/svg'
import { useParams, usePathname } from 'next/navigation'
import Link from 'next/link'
export default function Footer() {
  const { name } = useParams()
  const pathname = usePathname()
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Desplazamiento suave al principio
  };
  return (pathname === `/payment/${name}` || pathname === '/form' || pathname === '/payment/success' || pathname === '/payment/error' || pathname === '/payment/pending' || pathname === `/detail/${name}`) ? null : (
    <footer className='bg-[#000] text-white h-[32vh] flex flex-row justify-between p-6 font-figtree'>
      <div className='flex flex-col gap-3 md:gap-6'>
        <Link href='/about'>
          <h3 className='font-bold md:text-xl'>ABOUT US</h3>
        </Link>
        <Link href='/comments'>
          <h3 className='font-bold md:text-xl'>COMMENTS</h3>
        </Link>
        <Link href='/form'>
          <h3 className='font-bold md:text-xl'>CREATE</h3>
        </Link>
        <Link href='/search'>
          <h3 className='font-bold md:text-xl'>SEARCH</h3>
        </Link>
      </div>

      <div className='flex flex-col gap-4 text-center items-center relative bottom-5 md:gap-6'>
        <div className='w-28 h-[4rem]'>

          <img className='w-28 h-20' src='https://res.cloudinary.com/hyperevents/image/upload/v1693173297/eaa18030c4d08143afa9c965bd38bff8_zud8ee.png' alt='cloudinary-image'></img>
        </div>
        <div className='flex justify-evenly gap-2'>
          <IconFacebook />
          <IconIg />
          <IconTwitter />
        </div>
        <div
          className='bg-purpleOscuro w-12 h-12 flex justify-center items-center rounded-full md:w-18 md:h-18'
          onClick={handleScrollToTop}
        >
          <IconArrow />

        </div>
      </div>
    </footer>
  );
}