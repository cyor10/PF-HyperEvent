import React from "react";
import Link from "next/link";
import Image from "next/image";
import axiosInstance from '../../utils/axiosInstance';

export default async function FetchEvents({ params }) {
  const { data } = await axiosInstance("/events")

  return (
    <div className="p-8 bg-white">
      {data.events.map((event) => (
        <Link href="/detail/[name]" as={`/detail/${event.event_name}`}>
            <div key={event.id} className="mb-4 p-4 bg-gray-700 rounded-lg shadow-md flex flex-col text-center">
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



