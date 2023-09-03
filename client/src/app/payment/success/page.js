'use client'
import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axiosInstance from '@/utils/axiosInstance';

export default function Success() {
  const paymentQuery = useSearchParams();
  const status = paymentQuery.get('status');
  const paymentId = paymentQuery.get('payment_id');
  useEffect(() => {
    async function sendPaymentInfo() {
      if(status==="approved"){ 
      try {
        const paymentInfo = JSON.parse(localStorage.getItem('paymentInfo'));
        paymentInfo.status="approved"
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
    <div className="flex flex-col items-center justify-center h-screen bg-blue-200">
      <h2 className="text-3xl font-semibold mb-4 text-green-600">Payment Successful</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-medium mb-2 text-gray-700">Status: {status}</h2>
        <h2 className="text-lg font-medium text-purple-600">Payment ID: {paymentId}</h2>
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
 