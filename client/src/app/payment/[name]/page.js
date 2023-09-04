'use client';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { IconMercadoPago, IconXPayment } from '@/utils/svg/svg';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function Payment({ params }) {
  const router = useRouter()
  const [event, setEvent] = useState({});
  const reduxUser = useSelector((state) => state.counter);
  const { name } = params; 
  const query = useSearchParams()
  const tikcetCount = query.get("ticketCount")
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstance(`/events?name=${name}`);
        setEvent(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  
  const [inputs, setInputs] = useState({
    event_name: '',
    amount: '',
    description: 'Ticket',
    name: reduxUser.name.split(" ")[0],
    last_name: reduxUser.last_name || reduxUser.name.split(" ")[1],
    email: reduxUser.email,
  });
  
  useEffect(() => {
    if (event.event_name && event.price) {
      setInputs({
        event_name: event.event_name,
        amount: event.price*tikcetCount,
        description: 'Ticket',
        name: reduxUser.name.split(" ")[0],
        last_name: reduxUser.last_name || reduxUser.name.split(" ")[1],
        email: reduxUser.email,
      });
    }
  }, [event, reduxUser]);

  function handleInputs(event) {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  }
  const paymentInfo = {
    event_name: inputs.event_name,
    amount: inputs.amount,
    name: inputs.name,
    last_name: inputs.last_name,
    email: inputs.email,
    status: '',
    tikcetCount: tikcetCount,
  };

  async function pay(event) {
    event.preventDefault();
    try {
      const requestData = {
        monto: inputs.amount,
        descripcion: inputs.description,
      };

      const { data } = await axiosInstance.post('/pagar', requestData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });

      console.log(data);
      localStorage.setItem('paymentInfo', JSON.stringify(paymentInfo));
      window.location.href = data.init_point;
    } catch (error) {
      console.log(error);
    }
  }

  const handleGoToHome = () => {
    router.push(`/`);
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="flex flex-row justify-center items-center p-5">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Check-out</h2>
          <p className="pt-3">Time left 20:00</p>
        </div>
        <div className="ml-3">
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
                onChange={handleInputs}
                value={inputs.name}
                placeholder="John"
              />
            </div>

            <div className="flex flex-col pt-5">
              <label className="block text-gray-700 font-semibold mb-2">
                Last Name
              </label>
              <input
                className="w-[90%] px-3 py-2 text-[grey] border-[grey] border-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                key="last_name"
                type="last_name"
                name="last_name"
                onChange={handleInputs}
                value={inputs.last_name}
                placeholder="Doe"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 mx-5">
          <label className="block text-gray-700 font-semibold	 mb-2 ml-1">
            Email
          </label>
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
            <label className="text-[.9rem]">
              I want to stay informed about the events and news from this
              organizer.
            </label>
            <input type="checkbox"></input>
          </div>
        </div>

        <h3 className="text-2xl ml-5 pt-5 font-bold">Pay with</h3>

        <div className="flex justify-center rounded-md mt-5 items-center w-[90%] border-2 border-purpleOscuro h-16 mx-auto">
          <IconMercadoPago />
        </div>

        <p className="text-end text-xl pr-10 pt-2">Total: ${inputs.amount}</p>

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