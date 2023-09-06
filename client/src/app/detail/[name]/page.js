"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import Link from "next/link";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import {
  IconCalendar,
  IconFacePurple,
  IconIgPurple,
  IconNav,
  IconTwitterPurple,
} from "@/utils/svg/svg";

export default function Detail({ params }) {
  const { name } = params;
  const [event, setEvent] = useState({});
  const [showMap, setShowMap] = useState(false); // Nueva variable de estado
  const [ticketCount, setTicketCount] = useState(1);


  const [ totalPrice, setTotalPrice ] = useState(0)


  const priceTotal = ticketCount * event.price

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
    if (event.location) {
      return (
        <GoogleMap
          zoom={15}
          center={{ lat: event.location.lat, lng: event?.location.lon }}
          mapContainerClassName="w-full h-[230px]"
          options={{
            mapId: "5a77ea9001288394",
            disableDefaultUI: true,
            clickableIcons: false,
          }}
        >
          <Marker
            position={{ lat: event.location.lat, lng: event?.location.lon }}
          />
        </GoogleMap>
      );
    }
  }
// Función para incrementar el contador
  const incrementCount = () => {
    setTicketCount((prevCount) => prevCount + 1);
  };

  // Función para decrementar el contador
  const decrementCount = () => {
    if (ticketCount > 1) {
      setTicketCount((prevCount) => prevCount - 1);
    }
  };
  return (
    <div className=" bg-white pt-16">
      <div className="bg-white text-black w-[100%]">
        <img
          src={event?.event_image}
          className="w-[100%] h-[35vh] rounded-b-3xl"
          height={200}
          width={200}
          alt="event-image"
        />
        <h3 className="ml-4 pt-5 text-black font-medium">{`${dayName}, ${month} ${dayNum}`}</h3>
        <h2 className="text-4xl mt-3 mb-2 ml-4 px-2 font-bold	">
          &quot;{event && event.event_name}&quot;
        </h2>
        <p className="ml-5 py-2 text-lg">{event?.intro}</p>
        <p className="px-5 pt-2 text-[.95rem] font-normal">
          Dive into &quot;JODOROWSKY&apos;S DUNE&quot; at our LUNES MÍSTICOS
          event – an exclusive tribute to visionary filmmaker Alejandro
          Jodorowsky.🎬✨
        </p>
        <div className="flex mt-8 justify-between">
          <div className="flex mr-11"></div>
        </div>
        <div>
          <h2 className="text-2xl ml-6 mt-4 font-bold	">When and where</h2>

          <div className="flex ml-6 mt-4 items-center">
            <IconCalendar />
            <div>
              <h3 className="text-lg ml-4 font-[1.2x  rem] font-medium">
                Date and time
              </h3>
              <h3 className="ml-4">{event.start_at?.split("T")[0]}  To  {event.end_at?.split("T")[0]}</h3>
            </div>
          </div>
          <div className="flex ml-6 mt-4 items-baseline">
              <IconNav />
            <div className="w-full flex flex-col">
              <h3 className="text-lg ml-4 font-[1.2x  rem] font-medium">
                Location
              </h3>

              <button
                className="flex m-2 mt-1 ml-3  mb-1 text-lg text-blue-500 cursor-pointer"
                onClick={() => setShowMap(!showMap)} // Alternar visibilidad del mapa
                >
                {" "}
                {showMap ? "Hide Map" : "Show map"}
              </button>
              {showMap && (!isLoaded ? <div>Loading...</div> : <Map />)}
                </div>
          </div>
        </div>
        <h2 className="text-2xl ml-6 mt-8 mb-2 text-black font-medium">
          About this event
        </h2>
        <p className="px-5 pt-2 text-[.95rem] text-black font-normal	">
          On Monday, August 28th, at 7 pm, in our movie theater, we will screen
          the award-winning documentary &quot;JODOROWSKY&apos;S DUNE&quot; by
          Frank Pavich.
          <br />
          <br /> In 1975, the versatile artist and cult director Alejandro
          Jodorowsky dreamed of a project: the adaptation of the classic science
          fiction novel &quot;Dune&quot; by Frank Herbert. Alongside Hollywood
          screenwriter and master of special effects Dan O&apos;Bannon, the
          (future) designer of &quot;Alien&quot; H.R. Giger, and comic artist
          Jean “Moebius” Giraud, all under Jodorowsky&apos;s direction,
          &quot;Dune&quot; would be an all-out blockbuster.
          <br />
          <br /> We&apos;ll enhance the evening with tarot readings by Yanina
          Faccio. Tickets can be reserved by clicking the link in our bio. With
          your reservation, you&apos;ll have access to a seat in our movie
          theater, a pair of wireless headphones for watching the film, and a
          glass of wine or beer.
        </p>
        <h3 className="text-lg ml-6 mt-2">{event && event.description}</h3>
        <h3 className="text-2xl ml-6 mt-10 text-black font-medium">
          Follow this event
        </h3>
        <div className="flex mt-6 justify-center gap-10">
          <IconFacePurple />

          <IconIgPurple />

          <IconTwitterPurple />
        </div>
        <div className="flex flex-col justify-center mt-8 min-h-[40vh] items-center bg-purpleNav bg-opacity-20 max-h-40">
        <div className="flex flex-row w-[90%] justify-between h-40 p-5 bg-white border-2 border-purpleOscuro rounded mt-5">
        <div>
            <h3 className="text-lg">&quot;{event && event.event_name}&quot;</h3>
            <p>${Math.floor(priceTotal)}</p> {/* Actualizar el precio según el contador */}
          </div>
          <div className="flex flex-row gap-3">
            <div
              className="w-6 h-6 bg-purpleOscuro flex justify-center items-center rounded-full cursor-pointer"
              onClick={decrementCount}
            >
              <p className="text-[1.2rem] mb-1 text-white">-</p>
            </div>
            <p>{ticketCount}</p> {/* Mostrar el valor del contador */}
            <div
              className="w-6 h-6 bg-purpleOscuro flex justify-center items-center rounded-full cursor-pointer"
              onClick={incrementCount}
            >
              <p className="text-[1.2rem] mb-1 text-white">+</p>
            </div>
          </div>
          </div>
          <div className="flex justify-center w-[90%] bg-purpleOscuro mt-10 h-20 mb-5 items-center rounded-md relative cursor-pointer">
            <Link className="text-white" href="/payment/[name]" as={`/payment/${event.event_name}?ticketCount=${ticketCount}`}>
              Buy Tickets for ${Math.floor(priceTotal)}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
