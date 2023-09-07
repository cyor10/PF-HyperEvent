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
    <div className=" bg-white text-black pt-16 font-figtree min-h-[105%] md:pb-0 md:min-h-[90%]">
      <img
          src={event?.event_image}
          className="w-[100%] h-[20vhrem] rounded-b-3xl object-cover md:hidden"
          height={200}
          width={200}
          alt="event-image"
        />
        
      <div className= "w-[100%] h-[15rem] bg-[#F4EFFD] hidden md:flex md:mb-20">
      <img
          src={event?.event_image}
          className="w-[60%] h-[120%] mx-[20%] rounded-b-3xl"
          height={200}
          width={200}
          alt="event-image"
        />
      </div>

    
      <div className="grid md:grid-cols-2">
        <div>
        <h3 className="ml-4 pt-5 text-bold font-medium">{`${dayName}, ${month} ${dayNum}`}</h3>
        <h2 className="text-[clamp(2.25rem,1vw,2.5rem)] mt-3 mb-2 ml-6 font-bold	">
          &quot;{event && event.event_name}&quot;
        </h2>
        <p className="ml-6 py-2 text-lg">{event?.intro}</p>

        <div className="flex mt-3 justify-between">
          <div className="flex mr-11"></div>
        </div>
        <div>
          <h2 className="text-2xl ml-6 mt-4 font-bold	">When and where</h2>

          <div className="flex ml-6 mt-4 items-center">
            <IconCalendar />
            <div>
              <h3 className="text-lg ml-4 font-medium">
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
        <h2 className="text-2xl ml-6 mt-8 font-bold">
          About this event
        </h2>
       
        <h3 className="text-lg ml-6 mt-8">{event && event.description}</h3>
        <h3 className="text-2xl ml-6 mt-4 font-bold">
          Follow this event
        </h3>
        <div className="flex mt-6 pl-6 justify-start gap-10 mb-40 md:mb-10">
          <IconFacePurple />

          <IconIgPurple />

          <IconTwitterPurple />
        </div>
        <div className="mx-auto flex flex-col fixed bottom-0 pb-3 right-0 left-0 min-h-[12rem] items-center bg-[#F4EFFD] md:hidden">
          <div className="flex w-[90%] max-w-[30rem] justify-between h-[40%] px-4 py-6 bg-white border-4 border-purpleOscuro rounded mt-5">
            <div>
              <h3 className="text-[clamp(1.02rem,3.5vw,1.4rem)]">&quot;{event && event.event_name}&quot;</h3>
              <p className="text-bold pt-1 mt-1 text-[clamp(1.2rem,6vw,1.4rem)]">${Math.floor(priceTotal)}</p> {/* Actualizar el precio según el contador */}
            </div>
            <div className="flex flex-row gap-3 flex-shrink-0 align-center">
              <div
              className="w-6 h-6 bg-purpleOscuro flex justify-center items-center rounded-full cursor-pointer"
              onClick={decrementCount}
              >
              <p className="text-[1.2rem] text-white">-</p>
            </div>
            <p className="text-bold text-[1.2rem]">{ticketCount}</p> {/* Mostrar el valor del contador */}
            <div
              className="w-6 h-6 bg-purpleOscuro flex justify-center items-center rounded-full cursor-pointer"
              onClick={incrementCount}
            >
              <p className="text-[1.2rem] text-white">+</p>
            </div>
          </div>
          </div>
            <div className="flex p-2 justify-center w-[90%] max-w-[30rem] bg-purpleOscuro mt-3 h-[20%] items-center rounded-md relative cursor-pointer">
              <Link className="text-white text-[clamp(1.15rem,4vw,1.3rem)]" href="/payment/[name]" as={`/payment/${event.event_name}?ticketCount=${ticketCount}`}>
               Buy Tickets for ${Math.floor(priceTotal)}
              </Link>
            </div>
        </div>
        </div>
        <div className="w-[100%]">
          <div className="hidden w-[35%]  mx-auto fixed md:flex flex-col bottom-0 pb-3 right-0 min-h-[15rem] items-center bg-[#F4EFFD] rounded-2xl">
          <div className="flex w-[90%] max-w-[25rem] justify-between h-[40%] px-4 py-6 bg-white border-4 border-purpleOscuro rounded mt-5">
            <div>
              <h3 className="text-[clamp(0.6rem,3vw,1.3rem)]">&quot;{event && event.event_name}&quot;</h3>
              <p className="text-bold pt-1 mt-1 text-[clamp(1.2rem,6vw,1.4rem)]">${Math.floor(priceTotal)}</p> {/* Actualizar el precio según el contador */}
            </div>
            <div className="flex flex-row gap-3 flex-shrink-0 align-center">
              <div
              className="w-6 h-6 bg-purpleOscuro flex justify-center items-center rounded-full cursor-pointer"
              onClick={decrementCount}
              >
              <p className="text-[1.2rem] text-white">-</p>
            </div>
            <p className="text-bold text-[1.2rem]">{ticketCount}</p> {/* Mostrar el valor del contador */}
            <div
              className="w-6 h-6 bg-purpleOscuro flex justify-center items-center rounded-full cursor-pointer"
              onClick={incrementCount}
            >
              <p className="text-[1.2rem] text-white">+</p>
            </div>
            </div>
            </div>
            <div className="flex p-2 justify-center w-[90%] max-w-[25rem] bg-purpleOscuro mt-3 h-[20%] items-center rounded-md relative cursor-pointer">
              <Link className="text-white text-[clamp(1.15rem,4vw,1.3rem)]" href="/payment/[name]" as={`/payment/${event.event_name}?ticketCount=${ticketCount}`}>
               Buy Tickets for ${Math.floor(priceTotal)}
              </Link>
            </div>
          </div>
        </div>
     
      </div>
    </div>
  );
}
