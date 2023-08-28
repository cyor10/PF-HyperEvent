"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axiosInstance from "../../utils/axiosInstance";
import { useSearchParams } from "next/navigation";

export default function FetchEvents({ params }) {
  const paymentQuery = useSearchParams();
  const name = paymentQuery.get("name");
  const [events, setEvents] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstance(
          `/events-by-category?name=${name}`
        );
        setEvents(data.events);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="p-8 bg-white pt-24">
      {events.map((event, index) => (
        <Link
          key={index}
          href="/detail/[name]"
          as={`/detail/${event.event_name}`}
        >
          <div className="mb-4 p-4 bg-white border-2 border-neutral-950 rounded-lg shadow-md flex flex-col text-center">
            <h2 className="text-2xl text-black pb-4">{event.event_name}</h2>
            <Image
              className="rounded-lg w-[20rem] h-[13rem]"
              key={event.event_image}
              src={event.event_image}
              alt={event.start_at}
            />
            <p className="text-[1.2rem] text-black pt-2">
              {event.city}, {event.country}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

