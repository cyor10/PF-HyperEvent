"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axiosInstance from "../../utils/axiosInstance";
import { useSearchParams } from "next/navigation";
import { IconFavWhite, IconFavRed } from "@/utils/svg/svg";

export default function FetchEvents({ params }) {
  const [isFav, setIsFav] = useState([]);
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
    <div className="mx-auto text-black font-figtree font-bold text-[clamp(1.25rem,6vw,3rem)]">
    <h2 className="mx-auto mt-20">
      {name}
    </h2>
    <div className="mt-10 grid pb-10 pt-3 md:grid-cols-2 gap-6 w-full justify-center lg:grid-cols-3">
        {events.map((event, index) => (
          <div className="bg-white shadow-md mx-auto w-[21rem] h-[19.5rem] rounded-lg flex flex-col relative" key={index}>
            <Image
              className="w-[100%] h-[45%] object-cover rounded-t-lg z-100 relative"
              src={event.event_image}
              alt="Descripción de la imagen"
              width={1200}
              height={300}
            />
            <div className="absolute flex justify-center rounded-full w-9 h-9 z-100 right-[1rem] bottom-[11.5rem] bg-white">
              <button className="" onClick={() => handleFavorite(index)}>
                {isFav[index] ? <IconFavRed /> : <IconFavWhite />}
              </button>
            </div>
            <Link className="z-0" href="/detail/[name]" as={`/detail/${event.event_name}`}>
              <div>
                <h2 className="text-black text-[1.3rem] pt-2 pl-5 font-normal">{event.event_name}</h2>
                <p className="text-[#784DC7] text-[1rem] pt-2 pl-5 font-normal">{event.start_at.split("T")[0]}</p>
                <p className="text-black text-[.9rem] mt-2 pb-2.5 pl-5 font-light">{event.city}</p>
                <p className="text-black text-[1rem] pb-2.5 pl-5 font-normal">From ${event.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      </div>
  );
}

