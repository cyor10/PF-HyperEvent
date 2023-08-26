"use client"
import React from 'react'
import { IconArrow, IconFacebook, IconIg, IconTwitter } from '@/utils/svg/svg'
import { useRouter } from 'next/navigation'

export default function Footer() {

  const router = useRouter()

  const handleGoToHome = () => {
    router.push('/');
  };

  return (
    <footer className='bg-[#000] text-white h-[100%] flex flex-row justify-between p-6'>
      <div className='flex flex-col gap-3'>
        <h3 className='font-bold'>ABOUT US</h3>
        <h3 className='font-bold'>CONTACT</h3>
        <h3 className='font-bold'>CREATE</h3>
        <h3 className='font-bold'>SEARCH</h3>
      </div>

      <div className='flex flex-col gap-4 text-center items-center'>
        <h3>LOGO</h3>
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
