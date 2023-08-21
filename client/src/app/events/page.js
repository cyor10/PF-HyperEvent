import React from "react";
import Link from "next/link";
import Image from "next/image";
import axiosInstance from '../../utils/axiosInstance';

export default async function FetchEvents({ params }) {
  const { data } = await axiosInstance("/events")

  return (
    <div className="p-8">
      {data.events.map((event) => (
        <div key={event.id} className="mb-4 p-4 bg-black-100 rounded shadow-md">
          <Link href="/detail/[name]" as={`/detail/${event.event_name}`}>
            <h2>{event.event_name}</h2>
          </Link>
          <Image key={event.event_image} height={100} width={100} src={event.event_image} alt={event.start_at} />
          <p>
            {event.city}, {event.country}
          </p>
        </div>
      ))}
    </div>
  );
}



