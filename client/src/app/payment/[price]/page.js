"use client";
import React, { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { IconMercadoPago, IconXPayment } from "@/utils/svg/svg";
import { useRouter } from "next/navigation";

import { useParams } from "next/navigation";

export default function Payment({params}) {

  const { price } =  params 
  
  const router = useRouter();

  const [inputs, setInputs] = useState({
    amount: "1",
    description: "Ticket",
  });

  function handleInputs(event) {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  }
  const paymentInfo = {
    amount: inputs.amount,
  };

  async function pay(event) {
    event.preventDefault();
    try {
/*       const token = localStorage.getItem("token");
      if (!token) alert("Must have an account to buy tickets"); */
      const requestData = {
        monto: inputs.amount,
        descripcion: inputs.description,
      };
      
      const {data} = await axiosInstance.post('/pagar', requestData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer "+ localStorage.getItem("token"),
        }}
      );

      console.log(data);
      localStorage.setItem("paymentInfo", JSON.stringify(paymentInfo));
      window.location.href = data.init_point;
    } catch (error) {
      console.log(error);
    }
  }

  const handleGoToHome = () => {
    router.push(`/`);
  };

  return (
    <div className="flex flex-col w-[100%] min-h-[100vh] fixed">
      <div className="w-[100%] flex flex-row justify-center items-center pt-5 relative">
        <div className="text-center">
          <h2 className="text-2xl font-bold	">Check-out</h2>
          <p className="pt-3">Time left 20:00</p>
        </div>
        <div className="absolute bottom-5 left-[19.5rem] w-[100%]">
          <button onClick={handleGoToHome}>
            <IconXPayment />
          </button>
        </div>
      </div>

      <div className="border-[.1rem] border-black mt-6"></div>

      <form className="flex flex-col" onSubmit={pay}>
        <h3 className="pt-5 ml-5 text-xl font-bold">Billing information</h3>

        <div className="mb-2 flex flex-col">
          <div className="flex">
            <div className="flex flex-col pl-5 pt-5">
              <label className="block text-gray-700 font-semibold mb-2">
                Name
              </label>
              <input
                className="w-[80%] px-3 py-2 text-[grey] border-[grey] border-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                key="name"
                type="name"
                name="name"
                placeholder="John"
              />
            </div>

            <div className="flex flex-col pt-5">
            <label className="block text-gray-700 font-semibold mb-2">
              Last Name
            </label>
            <input
              className="w-[90%] px-3 py-2 text-[grey] border-[grey] border-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              key="lastName"
              type="lastName"
              name="lastName"
              placeholder="Doe"
            />
            </div>
          </div>
        </div>

        <div className="mt-4 mx-5">
          <label className="block text-gray-700 font-semibold	 mb-2 ml-1">Email</label>
          <input
            className="w-[100%] px-3 py-2 rounded-md text-[grey] border-[grey] border-2 focus:outline-none focus:ring focus:border-blue-500  font-normal"
            key="email"
            type="email"
            name="email"
            onChange={handleInputs}
            value={inputs.email}
            placeholder="example@gmail.com"
          ></input>
        </div>

        <div className="pt-5">
            <div className="flex flex-row-reverse px-6 gap-5">
              <label className="text-[.9rem]">I want to stay informed about the events and news 
              from this organizer.</label>
              <input type="checkbox"></input>
            </div>
        </div>

        <h3 className="text-2xl ml-5 pt-5 font-bold">Pay with</h3>

        <div className="flex justify-center rounded-md mt-5 items-center w-[90%] border-2 border-purpleOscuro h-16 mx-auto">
        <IconMercadoPago />

        </div>

        <p className="text-end text-xl pr-10 pt-2">Total: ${price}</p>

        <button
          className="mt-4 px-4 py-2 w-[50%] h-12 text-white text-xl rounded-md bg-purpleOscuro mx-auto" 
          type="submit"
        >
          Place an order
        </button>
      </form>
    </div>
  );
}