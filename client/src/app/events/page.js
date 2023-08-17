import React from "react";
import Link from "next/link";
const fetchingData = () => {
  return fetch("http://localhost:3001/events").then((res) => res.json());
};

export default async function FetchEvents({ params }) {
  const post = await fetchingData();
  return (
    <div className="p-8">
      {post.events.map((event) => (
        <div key={event.id} className="mb-4 p-4 bg-black-100 rounded shadow-md">
          <Link href="/detail/[id]" as={`/detail/${event.id}`}>
            {event.id}
          </Link>
          <h1 className="text-gray-600">{event.type.split("_").join(" ")}</h1>
          <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
        </div>
      ))}
    </div>
  );
}
