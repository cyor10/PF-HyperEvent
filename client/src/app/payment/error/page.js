'use client'
import React, {useEffect} from 'react'
import { useSearchParams } from 'next/navigation'
import { IconXPayment, IconError } from '@/utils/svg/svg'
import axiosInstance from "@/utils/axiosInstance"

export default function Error() {
  const paymentQuery = useSearchParams()
  const status = paymentQuery.get('status')
  const paymentId = paymentQuery.get('payment_id')
  useEffect(() => {
    async function sendPaymentInfo() {
      if(status==="failure"){ 
      try {
        const paymentInfo = JSON.parse(localStorage.getItem('paymentInfo'));
        paymentInfo.status="failure"
        const response = await axiosInstance.post('/sales', { paymentInfo }, {
          headers: {
            'Content-Type': 'application/json', // Use application/json for JSON data
          },
        });

        if (response.status === 500) {
          console.log('It has been an error in the payment');
          localStorage.removeItem('paymentInfo');
        } else {
          console.error('Failed to send payment information');
        }
      } catch (error) {
        console.error('Error sending payment information:', error);
      }
    }}

    sendPaymentInfo();
  }, []);

 
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