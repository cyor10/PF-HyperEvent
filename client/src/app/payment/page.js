"use client";
import React, { useState } from "react";
import axiosInstance from '../../utils/axiosInstance';

export default function Payment() {
  const [inputs, setInputs] = useState({
    amount: "",
    description: "",
  });

  function handleInputs(event) {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  }

  console.log(inputs);

  async function pay(event) {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) alert("Must have an account to buy tickets");
    
      const requestData = {
        monto: inputs.amount,
        descripcion: inputs.description,
      };
      
      const {data} = await axiosInstance.post('/protected/pagar', requestData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer "+ localStorage.getItem("token"),
        }
      })

      console.log(data);
      window.location.href = data.init_point;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-200">
  <h2 className="text-2xl font-semibold mb-4 text-green-600">Test de Pago</h2>

  <form className="w-1/2 p-6 bg-white rounded-lg shadow-md" onSubmit={pay}>
    <label className="block mb-2 text-gray-700" htmlFor="amount">
      Amount
    </label>
    <input
      className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
      onChange={handleInputs}
      type="text"
      name="amount"
      value={inputs.amount}
      placeholder="Add amount"
    />

    <label className="block mt-4 mb-2 text-gray-700" htmlFor="description">
      Description
    </label>
    <input
      className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
      onChange={handleInputs}
      type="text"
      name="description"
      value={inputs.description}
    />

    <button
      className="mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      type="submit"
    >
      Buy
    </button>
  </form>
</div>
  );
}
