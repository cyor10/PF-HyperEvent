import React, { useState } from 'react'
import Link from 'next/link'
import { IconFavWhite, IconFavRed } from '@/utils/svg/svg'
import Image from 'next/image'
import { toast } from "react-hot-toast";

export default function Card({ props }) {
  const { event, index } = props
  const [isFav, setIsFav] = useState(false)

  const handleFavorite = () => {
    const updatedState = !isFav;
    if (updatedState === true) {
      toast('Event added to favorites!', {
        icon: '❤',
        duration: 1500,
        position: 'top-right',
        style: {
          border: '3px solid #925FF0',
          padding: '16px',
          color: "#925FF0",
        }
      });
    }
    if (updatedState === false) {
      toast("Event deleted from favorites", {
        icon: '🤍',
        duration: 1500,
        position: 'top-right',
        style: {
          border: '3px solid #925FF0',
          padding: '16px',
          color: "#925FF0",
        }
      });
    }
    setIsFav(updatedState);
  }
  return (
    <div className="bg-white shadow-md mx-auto w-[21rem] h-[19.5rem] rounded-lg flex flex-col relative" key={index}>
      <Image
        className="w-[100%] h-[45%] object-cover rounded-t-lg z-100 relative"
        src={event.event_image}
        alt="Descripción de la imagen"
        width={1200}
        height={300}
      />
      <div className="absolute flex justify-center rounded-full w-9 h-9 z-100 right-[1rem] bottom-[11.5rem] bg-white">
        <button className="" onClick={() => handleFavorite()}>
          {isFav ? <IconFavRed /> : <IconFavWhite />}
        </button>
      </div>
      <Link className="z-0" href="/detail/[name]" as={`/detail/${event?.event_name}`}>
        <div>
          <h2 className="text-black text-[1.3rem] pt-2 pl-5 font-normal">{event.event_name}</h2>
          <p className="text-[#784DC7] text-[1rem] pt-2 pl-5 font-normal">{event.start_at.split("T")[0]}</p>
          <p className="text-black text-[.9rem] mt-2 pb-2.5 pl-5 font-light">{event.city}</p>
          <p className="text-black text-[1rem] pb-2.5 pl-5 font-normal">From ${event.price}</p>
        </div>
      </Link>
    </div>
  )
}
