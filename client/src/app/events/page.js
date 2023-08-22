'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axiosInstance from '../../utils/axiosInstance';
import { useSearchParams } from "next/navigation";

export default  function FetchEvents({ params }) {
  const paymentQuery = useSearchParams()
  const name = paymentQuery.get('name')
  const [events, setEvents] = useState([])
  useEffect(() => {
    (async ()=> {
      try {
          const { data } = await axiosInstance(`/events-by-category?name=${name}`)
          setEvents(data.events)
      } catch (error) {
          console.log(error)
      }
    })()
  }, [])
  
  return (
    <div className="p-8 bg-white">
      {events.map((event, index) => (
        <Link key={index} href="/detail/[name]" as={`/detail/${event.event_name}`}>
            <div  className="mb-4 p-4 bg-gray-700 rounded-lg shadow-md flex flex-col text-center">
            <h2 className="text-2xl pb-4">{event.event_name}</h2>
          <img className="rounded-lg" key={event.event_image}  src={event.event_image} alt={event.start_at} />
          <p className="text-1xl pt-4">
            {event.city}, {event.country}
          </p>
        </div>
          </Link>
      ))}
    </div>
  );
}



