"use client"
import React from 'react'
import { IconArrow, IconFacebook, IconIg, IconTwitter } from '@/utils/svg/svg'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useParams } from 'next/navigation'
export default function Footer() {
  const {name}= useParams()
  const router = useRouter()
  const pathname = usePathname()

  const handleGoToHome = () => {
    router.push('/');
  };

  return (pathname === `/detail/${name}` ) ? null : (
    <footer className='bg-[#000] text-white h-[100%] flex flex-row justify-between p-6'>
      <div className='flex flex-col gap-3'>
        <h3 className='font-bold'>ABOUT US</h3>
        <h3 className='font-bold'>CONTACT</h3>
        <h3 className='font-bold'>CREATE</h3>
        <h3 className='font-bold'>SEARCH</h3>
      </div>

      <div className='flex flex-col gap-4 text-center items-center relative bottom-5'>
        <div className='w-28 h-[4rem]'>

        <img className='w-28 h-20' src='https://res.cloudinary.com/hyperevents/image/upload/v1693173297/eaa18030c4d08143afa9c965bd38bff8_zud8ee.png'></img>
        </div>
        <div className='flex justify-evenly gap-2'>
          <IconFacebook/>
          <IconIg/>
          <IconTwitter/>
        </div>
        <div  onClick={handleGoToHome} className='bg-purpleOscuro w-12 h-12 flex justify-center items-center rounded-full'>
        <IconArrow/>

        </div>
      </div>
    </footer>
  )
}