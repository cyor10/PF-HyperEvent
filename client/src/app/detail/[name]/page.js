"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import Link from "next/link";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Image from "next/image";
import { IconCalendar, IconFacePurple, IconIgPurple, IconTwitter, IconTwitterPurple } from "@/utils/svg/svg";

export default function Detail({ params }) {
  const { name } = params;
  const [event, setEvent] = useState({});

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

  const numericDate = new Date(event.start_at);
  const week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayName = week[numericDate.getDay() + 1];
  const dayNum = numericDate.getDate() + 1;
  const month = monthsOfYear[numericDate.getMonth()];

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

 
  function Map() {
    if (event.adress) {
      return (
        <GoogleMap
          zoom={15}
          center={{ lat: event.adress.lat, lng: event?.adress.lon }}
          mapContainerClassName="w-full h-[230px]"
          options={{mapId: "5a77ea9001288394",disableDefaultUI: true,clickableIcons: false,}}
        >
          <Marker position={{ lat: event.adress.lat, lng: event?.adress.lon }} />
        </GoogleMap>
      );
    }
  }

  return (
    <div className=" bg-white pt-16">
      <div className="bg-white text-black w-[100%]">
        <Image
          src={event?.event_image}
          className="w-[100%] h-[35vh] rounded-b-3xl"
          height={200}
          width={200}
          alt="event-image"
          loading="lazy"
        />
        <h3 className="ml-4 pt-5 text-black font-medium">{`${dayName}, ${month} ${dayNum}nd`}</h3>
        <h2 className="text-4xl mt-2 ml-4 font-bold	">
          &quot;{event && event.event_name}&quot;
        </h2>
        <p className="px-5 pt-2 text-[.95rem] font-normal">Dive into &quot;JODOROWSKY&apos;S DUNE&quot; at our LUNES MÍSTICOS event – an exclusive tribute to visionary filmmaker Alejandro Jodorowsky.🎬✨</p>
        <div className="flex mt-8 justify-between">
          <div className="flex mr-11">
          </div>
        </div>
        <div>
          <h2 className="text-2xl ml-6 mt-4 font-bold	">When and where</h2>

          <div className="flex ml-6 mt-4 items-center">
            <IconCalendar/>
            <div>
              <h3 className="text-lg ml-4 font-[1.2x  rem]">Date and time</h3>
              <h3 className="ml-4">{event.start_at?.split("T")[0]}</h3>
            </div>
          </div>
          <div className="flex m-2 mt-4 ">
            <div className="w-full flex flex-col">
              <h3 className="text-lg ml-4">Location</h3>
              {!isLoaded ? <div>Loading...</div> : <Map />}
            </div>
          </div>
        </div>
        <h2 className="text-2xl ml-6 mt-6 text-black font-medium">About this event</h2>
        <p className="px-5 pt-2 text-[.95rem] text-black font-normal	">On Monday, August 28th, at 7 pm, in our movie theater, we will screen the award-winning documentary &quot;JODOROWSKY&apos;S DUNE&quot; by Frank Pavich.
        <br/><br/> In 1975, the versatile artist and cult director Alejandro Jodorowsky dreamed of a project: the adaptation of the classic science fiction novel &quot;Dune&quot; by Frank Herbert. Alongside Hollywood screenwriter and master of special effects Dan O&apos;Bannon, the (future) designer of &quot;Alien&quot; H.R. Giger, and comic artist Jean “Moebius” Giraud, all under Jodorowsky&apos;s direction, &quot;Dune&quot; would be an all-out blockbuster.<br/><br/> We&apos;ll enhance the evening with tarot readings by Yanina Faccio. Tickets can be reserved by clicking the link in our bio. With your reservation, you&apos;ll have access to a seat in our movie theater, a pair of wireless headphones for watching the film, and a glass of wine or beer.</p>
        <h3 className="text-lg ml-6 mt-2">{event && event.description}</h3>
        <h3 className="text-2xl ml-6 mt-6 text-black font-medium">Follow this event</h3>
        <div className="flex mt-6 justify-center gap-10">
        <IconFacePurple/>

        <IconIgPurple/>

        <IconTwitterPurple/>

        </div>
        <div className="flex flex-col justify-center mt-8 h-56 items-center bg-purpleNav bg-opacity-20 border-2 border-purpleOscuro">
          <div className="w-[90%] h-40 p-5 bg-white border-2 border-purpleOscuro rounded mt-5">
          <h3 className="text-lg">{event && event.event_name}</h3>
          <p>$ 500,00</p>
          </div>
          <div className="flex justify-center w-[90%] bg-purpleOscuro mt-10 h-20 mb-5 items-center rounded-md relative cursor-pointer">
            <Link className="text-white" href="/payment">
              Buy Tickets for $ 500,00
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

