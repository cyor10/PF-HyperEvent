'use client'
import React, {useEffect} from 'react'
import { useSearchParams } from 'next/navigation'
import { IconXPayment, IconError } from '@/utils/svg/svg'

export default function Error() {
  const paymentQuery = useSearchParams()
  const status = paymentQuery.get('status')
  const paymentId = paymentQuery.get('payment_id')
  useEffect(() => {
    localStorage.removeItem("paymentInfo");
  }, []); // Empty dependency array ensures the effect runs only once after initial render

 
  return (
    <div className="flex w-[100%] flex-col items-center h-screen fixed"> {/* Cambiar el color de fondo */}
      <div className="absolute top-5 left-[19.5rem] w-[100%]">
          <button>
            <IconXPayment />
          </button>
        </div>
        <div className='flex flex-col gap-10 items-center pt-28 text-center text-textRed font-semibold'>
          <h2 className='w-[100%] text-4xl px-5'>Ooops! Something went wrong</h2>
          <IconError/>

          <p className='text-[1.1rem] px-5' >Find your unique QR on your email or in the ticket section</p>


          <button className='text-white w-48 h-12 bg-textRed mt-5 rounded'>
            TRY AGAIN
          </button>
        </div>
  </div>
  )
}