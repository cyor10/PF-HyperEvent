'use client'
import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axiosInstance from '@/utils/axiosInstance';
import { IconXPayment, IconSucces } from '@/utils/svg/svg';

export default function Success() {
  const paymentQuery = useSearchParams();
  const status = paymentQuery.get('status');
  const paymentId = paymentQuery.get('payment_id');

  useEffect(() => {
    async function sendPaymentInfo() {
      if(localStorage.getItem('paymentInfo')){ 
      try {
        const paymentInfo = JSON.parse(localStorage.getItem('paymentInfo'));

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
    <div className="flex w-[100%] flex-col items-center h-screen fixed">
        <div className="absolute top-5 left-[19.5rem] w-[100%]">
          <button>
            <IconXPayment />
          </button>
        </div>
        <div className='flex flex-col gap-10 items-center pt-28 text-center text-purpleOscuro font-semibold'>
          <h2 className='w-[100%] text-4xl px-5'>Successfully ordered!</h2>
          <IconSucces/>

          <p className='text-[1.1rem] px-5' >Find your unique QR on your email or in the ticket section</p>


          <button className='text-white w-48 h-12 bg-purpleOscuro mt-5 rounded'>
            SEE TICKET
          </button>
        </div>
    </div>
  );
}
/* ?collection_id=62343021919
& collection_status=approved
& payment_id=62343021919
& status=approved
& external_reference=null
& payment_type=account_money
& merchant_order_id=11224799987
& preference_id=1448550703-7f984f8c-4770-4721-9a19-457e912dd1eb
& site_id=MLA
& processing_mode=aggregator
& merchant_account_id=null */
 