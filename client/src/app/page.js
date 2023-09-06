'use client'
import React, { useState, useEffect } from "react";
import Carousel from "./components/Carousel/Carousel";
import Categories from "./components/Categories/Categories";
import axiosInstance from "../utils/axiosInstance";
import Link from "next/link";
import { IconFavWhite, IconFavRed } from "@/utils/svg/svg";
import Image from "next/image";
import { toast } from "react-hot-toast";

export default function LandingPage() {
  const [isFav, setIsFav] = useState([]);
  const [dataCarousel, setDataCarousel] = useState([]);
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventData = await axiosInstance("/events?page=1");
        const slicedEvents = eventData.data.events.slice(0, 20);
        setEvents(slicedEvents);

        const eventTopData = await axiosInstance('/events/top')
        setDataCarousel(eventTopData.data.topEvents);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(()=>{
    const fetchCategoriesData = async ()=>{
      try {
        const categoriesResponse = await axiosInstance("/categories?withEvent=true");
        const slicedCategories = categoriesResponse.data;
        setCategories(slicedCategories);
      } catch (error) {
        console.log(error)
      }
    };
    fetchCategoriesData();
  },[])

  console.log(categories);

  const handleFavorite = (index) => {
    setIsFav((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = !prevState[index];
      console.log(updatedState[index])
      if (updatedState[index] === true) {
        toast('Event added to favorites!', {
          icon: '❤',
          style: {
            border: '3px solid #925FF0',
            padding: '16px',
            color: "#925FF0",
          }
        });
      }
      if (updatedState[index] === false) {
        toast("Event deleted from favorites", {
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
    <div className="min-h-screen w-full bg-white font-figtree">
      <Carousel>
        {dataCarousel.map((event, index) => (
          <Image
            priority={true}
            className="w-full h-60 object-cover"
            src={event.event_image}
            alt="Descripción de la imagen"
            width={900}
            height={300}
            key={index}
          />
        ))}
      </Carousel>
      <div className="pt-10 pb-8">

        <h1 className="text-[clamp(2.25rem,8vw,4rem)] text-center pb-3 font-black tracking-tighter leading-[clamp(2.25rem,8vw,4rem)] text-black">FIND YOUR <br />EXPERIENCE</h1>

        <div className="w-[clamp(12rem,42vw,21rem)] mx-auto h-[clamp(0.6rem,2vw,0.8rem)] bg-black"></div>
      </div>

      <div className="mx-[min(3.5rem,5%)] pb-7">
         
        <Categories categories= {categories}>
          
        </Categories>
      </div>
      <div className="grid mx-auto pb-10 pt-3 md:grid-cols-2 gap-6 w-full justify-center lg:grid-cols-3">
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
      <div className="text-purpleOscuro mx-auto flex items-center justify-center w-[40%] h-[3.4rem] rounded-md bg-pinkChip mb-10 cursor-pointer">
        <h4 className="font-medium">See More</h4>
      </div>
    </div>
  );
}
