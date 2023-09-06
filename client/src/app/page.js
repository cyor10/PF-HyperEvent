'use client'
import React, { useState, useEffect } from "react";
import Carousel from "./components/Carousel/Carousel";
import Categories from "./components/Categories/Categories";
import axiosInstance from "../utils/axiosInstance";
import Link from "next/link";
import { IconFavWhite, IconFavRed } from "@/utils/svg/svg";
import Image from "next/image";
import FloatingCommentBubble from "./components/Comments/FloatingCommentBubble";
import { toast } from "react-hot-toast";

export default function LandingPage() {
  const [isFav, setIsFav] = useState([]);
  const [dataCarousel, setDataCarousel] = useState([]);
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const comments = ["¡Gran artículo!", "Interesante punto de vista", "Necesitamos más contenido como este"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventData = await axiosInstance("/events?page=1");
        const slicedEvents = eventData.data.events.slice(0, 20);
        setEvents(slicedEvents);

        const eventTopData = await axiosInstance('/events/top')
        setDataCarousel(eventTopData.data.topEvents);

        const categoriesResponse = await axiosInstance("/categories?withEvent=true");
        const slicedCategories = categoriesResponse.data;
        setCategories(slicedCategories);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);


  const handleFavorite = (index) => {
    setIsFav((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = !prevState[index];
      console.log(updatedState[index])
      if(updatedState[index]===true){toast('Event added to favorites!', {
        icon: '❤', 
        style: {
          border: '3px solid #925FF0',
          padding: '16px',
          color: "#925FF0",
        }
      });}
      if(updatedState[index]===false){toast("Event deleted from favorites",{
        icon: '🤍', 
        style: {
          border: '3px solid #925FF0',
          padding: '16px',
          color: "#925FF0",
        }
      });
    }
      return updatedState;
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white">
      <Carousel>
        {dataCarousel.map((event, index) => (
          <Image
            priority={true}
            className="w-[100%] h-80 object-cover"
            src={event.event_image}
            alt="Descripción de la imagen"
            width={900}
            height={300}
            key={index}
          />
        ))}
      </Carousel>
      <div className="pt-10">

        <h1 className="text-5xl text-center pb-3 font-black leading-10 text-black">FIND YOUR EXPERIENCE</h1>

        <div className="w-[76%] mx-auto h-3 bg-black"></div>
      </div>
      
      <div className="flex flex-col text-start justify-center w-full pt-3 pb-14">
        <h2 className="text-1xl pl-6 pt-8 font-bold text-black">CATEGORIES:</h2>
        <Categories>
          {categories.map((category, index) => (
            <Link
              className="w-[5rem] h-[6rem] mx-1.5 ml-5 mr-6"
              key={index}
              href={{
                pathname: "/events",
                query: { name: `${category.name}` },
              }}
            >
              <div className="rounded flex flex-col text-center items-center justify-center w-[6rem] h-[8rem] pt-15">
                <Image
                  loading="lazy"
                  className="w-[10rem] h-[5rem] rounded-lg text-xs object-cover"
                  src={category.image}
                  width={100}
                  height={100}
                  alt="Category"
                />
                <p className="pb-7 text-black">{category.name}</p>
              </div>
            </Link>
          ))}
        </Categories>
      </div>
      <div className="flex flex-col gap-6 w-[22rem] justify-center pb-10 pt-3">
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
                {isFav[index] ? <IconFavRed />  : <IconFavWhite />}
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
            <FloatingCommentBubble comments={comments} />
          </div>
        ))}
      </div>
      <div className="text-purpleOscuro flex items-center justify-center w-[40%] h-[3.4rem] rounded-md bg-pinkChip mb-10">
        <h4 className="font-medium">See More</h4>
      </div>
    </div>
  );
}
