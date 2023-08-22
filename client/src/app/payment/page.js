"use client";
import React, { useState } from "react";
import axiosInstance from '../../utils/axiosInstance';

export default function Payment() {
  const [inputs, setInputs] = useState({
    amount: "1111",
    description: "Ticket",
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
    <div className="flex flex-col items-center justify-center min-h-[83.9vh] bg-white">
  <h2 className="text-2xl font-semibold mb-4 text-green-600">Pay</h2>

  <form className="w-[80%] p-6 bg-[#9c9c9c] rounded-lg shadow-m border-2 border-neutral-950" onSubmit={pay}>
    <div className="shadow-m border-2 border-neutral-950 p-4 pb-5 rounded-md mb-8 text-center bg-[#457]">
    <label className="block mb-2 text-white text-[1.2rem]" htmlFor="amount">
      Amount
    </label>
   {/*  <input
      className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
      onChange={handleInputs}
      type="text"
      name="amount"
      value={inputs.amount}
      placeholder="Add amount"
    /> */}
    <h3 className="text-black text-center">${inputs.amount}</h3>

    </div>
    <div className="shadow-m border-2 border-neutral-950 p-4 pb-5 rounded-md mb-8 text-center bg-[#457]">

    <label className="block mt-4 mb-2 text-white text-center text-[1.2rem]" htmlFor="description">
      Description
    </label>
   {/*  <input
      className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
      onChange={handleInputs}
      type="text"
      name="description"
      value={inputs.description}
    /> */}
    <h3 className="text-black text-center">{inputs.description}</h3>
    </div>
    <button
      className="mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 w-[90%] ml-2"
      type="submit"
    >
      Buy
    </button>
  </form>
</div>
  );
}
