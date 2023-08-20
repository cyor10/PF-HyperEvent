import React from "react";
import axios from "axios";

export default async function Detail({ params }) {
  const { data } = await axios.get(
    `http://localhost:3001/events?name=${params.id}`
  );
  return (
    <div className="p-8 bg-gray-400 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-2">{data?.event_name}</h1>
      <h2 className="text-gray-700 mb-2">
        {data?.city}, {data?.province}, {data?.country}
      </h2>
      <img
        src={data?.event_image}
        alt={data?.event_name}
        className="w-large rounded-md"
      />
    </div>
  );
}
