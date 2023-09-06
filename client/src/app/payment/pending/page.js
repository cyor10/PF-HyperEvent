'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import axiosInstance from "@/utils/axiosInstance"
import { IconPending, IconXPayment } from '@/utils/svg/svg'
import { useRouter } from 'next/navigation'
export default function Pending() {

  const router = useRouter()
  const paymentQuery = useSearchParams()
  const status = paymentQuery.get('status')
  const paymentId = paymentQuery.get('payment_id')
  useEffect(() => {
    async function sendPaymentInfo() {
      if(status==="pending"){ 
      try {
        const paymentInfo = JSON.parse(localStorage.getItem('paymentInfo'));
        paymentInfo.status="pending"
        const response = await axiosInstance.post('/sales', { paymentInfo }, {
          headers: {
            'Content-Type': 'application/json', // Use application/json for JSON data
          },
        });

        if (response.status === 201) {
          console.log('Payment information sent successfully');
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
        <button onClick={()=>router.push("/")}>
          <IconXPayment />
        </button>
      </div>
      <div className='flex flex-col gap-10 items-center pt-32 text-center text-[#258F22]'>
        <h2 className='w-[100%] text-4xl px-5 font-bold'>Order in progress</h2>
        <IconPending/>

        <p className='text-[1.1rem] px-5 text-[#64C661]' >Visit the nearest shop and complete your payment. You’ll receive your ticket via email or rendered in the Ticket section.</p>


        <button onClick={()=>router.push("/")} className='text-white w-48 h-12 bg-[#64C661] mt-5 rounded '>
          Go to Home
        </button>
      </div>
</div>
  )
}