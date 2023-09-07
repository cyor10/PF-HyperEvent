'use client'
import React, { useState, useEffect } from "react";
import Carousel from "./components/Carousel/Carousel";
import Categories from "./components/Categories/Categories";
import axiosInstance from "../utils/axiosInstance";
import Image from "next/image";
import Cards from "./components/Cards/Cards";

export default function LandingPage() {
  const [dataCarousel, setDataCarousel] = useState([]);
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreEvents, setHasMoreEvents] = useState(true); 
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventData = await axiosInstance(`/events?page=${currentPage}`);
        const newEvents = eventData.data.events
        setEvents((prevEvents) => [...prevEvents, ...newEvents]);
        if(eventData.data.events.length<14){setHasMoreEvents(false)}        
        const eventTopData = await axiosInstance('/events/top');
        setDataCarousel(eventTopData.data.topEvents);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const categoriesResponse = await axiosInstance("/categories?withEvent=true");
        const slicedCategories = categoriesResponse.data;
        setCategories(slicedCategories);
      } catch (error) {
        console.log(error)
      }
    };
    fetchCategoriesData();
  }, [])

  const handleSeeMoreClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  return (
    <div className="min-h-screen w-full bg-white font-figtree text-black">
      <Carousel>
        {dataCarousel.map((event, index) => (
          <Image
            priority={true}
            className="w-[100%] h-72 object-cover"
            src={event.event_image}
            alt={event.event_name}
            width={900}
            height={300}
            key={index}
          />
        ))}
      </Carousel>
      <div className="pt-10 pb-8">

        <h1 className="text-[clamp(2.25rem,8vw,4rem)] text-center pb-3 font-black tracking-tighter leading-[clamp(2.25rem,8vw,4rem)] text-black">FIND YOUR <br />EXPERIENCE</h1>

        <div className="w-[clamp(12rem,42vw,22rem)] mx-auto h-[clamp(0.6rem,2vw,0.8rem)] bg-black pb-3"></div>
      </div>

      <div className="mx-[max(1rem,7%)] pb-7 text-black">
        <Categories categories={categories} />
      </div>
      
      <Cards props={ events }></Cards>

      {hasMoreEvents && (<button onClick={handleSeeMoreClick} className="text-purpleOscuro mx-auto flex items-center justify-center w-[40%] h-[3.4rem] rounded-md bg-pinkChip mb-10 cursor-pointer">
        <h4 className="font-medium">See More</h4>
      </button>)}
    </div>
  );
}
