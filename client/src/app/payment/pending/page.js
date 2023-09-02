'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import axiosInstance from "@/utils/axiosInstance"
export default function Pending() {
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
    <div className="flex flex-col items-center justify-center h-screen bg-blue-200"> {/* Cambiar el color de fondo */}
    <h1 className="text-3xl font-semibold mb-4 text-green-600">Pending payment</h1> {/* Cambiar el color de texto */}
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-medium mb-2 text-gray-700">Status: {status}</h2> {/* Cambiar el color de texto */}
      <h2 className="text-lg font-medium text-purple-600">Payment ID: {paymentId}</h2> {/* Cambiar el color de texto */}
    </div>
  </div>
  )
}