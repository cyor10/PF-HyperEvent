'use client'
import React, {useEffect} from 'react'
import { useSearchParams } from 'next/navigation'
export default function Error() {
  const paymentQuery = useSearchParams()
  const status = paymentQuery.get('status')
  const paymentId = paymentQuery.get('payment_id')
  useEffect(() => {
    localStorage.removeItem("paymentInfo");
  }, []); // Empty dependency array ensures the effect runs only once after initial render

 
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-200"> {/* Cambiar el color de fondo */}
    <h2 className="text-3xl font-semibold mb-4 text-green-600">Ops!. Payment incomplete</h2> {/* Cambiar el color de texto */}
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-medium mb-2 text-gray-700">Status: {status}</h2> {/* Cambiar el color de texto */}
      <h2 className="text-lg font-medium text-purple-600">Payment ID: {paymentId}</h2> {/* Cambiar el color de texto */}
    </div>
  </div>
  )
}