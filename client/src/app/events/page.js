import React from "react";
import Link from "next/link";
import axios from "axios";


export default async function FetchEvents({ params }) {
   const {data} = await axios.get("http://localhost:3001/events")
  
  return (
    <div className="p-8">
      {data.events.map((event) => (
        <div key={event.id} className="mb-4 p-4 bg-black-100 rounded shadow-md">
          <Link href="/detail/[id]" as={`/detail/${event.id}`}>
            <h2>{event.event_name}</h2>
          </Link>
          <img src={event.event_image} alt={event.start_at} />
          <p>{event.city}, {event.country}</p>
        </div>
      ))}
    </div>
  );
}



