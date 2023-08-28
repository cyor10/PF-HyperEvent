'use client'
import React, { useState, useEffect } from "react";
import Carousel from "./components/Carousel/Carousel";
import Categories from "./components/Categories/Categories";
import axiosInstance from "../utils/axiosInstance";
import Link from "next/link";
import { IconFavWhite, IconFavRed } from "@/utils/svg/svg";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Image from "next/image";

export default function LandingPage() {
  const [isFav, setIsFav] = useState([]);
  const [dataCarousel, setDataCarousel] = useState([]);
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventData = await axiosInstance("/events");
        const slicedEvents = eventData.data.events.slice(0, 20);
        setEvents(slicedEvents);
        setDataCarousel(slicedEvents.slice(0, 5));
        const categoriesResponse = await axiosInstance("/categories");
        const slicedCategories = categoriesResponse.data.slice(8, 15);
        setCategories(slicedCategories);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  
  const session = async () => await getServerSession(authOptions);
  useEffect(() => {
    async function fetchSessionData() {
      try {
        if (session?.email) {
          const cloud = new FormData();
          cloud.set("email", session.user.email);
          cloud.set("name", session.user.name);
          cloud.set("last_name", session.user.last_name);
          cloud.set("password", session.user.password);
          cloud.set("user_image", session.user.user_image);
          const response = await axiosInstance.post("/signup", cloud, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          console.log(response)
          if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            await axiosInstance("/protected", {
              headers: {
                Authorization: `Bearer ${response.data.token}`,
              },
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchSessionData();
  }, [session]);

  const handleFavorite = (index) => {
    setIsFav((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = !prevState[index];
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
        <h2 className="text-1xl pl-6 pt-8 font-bold">CATEGORIES:</h2>
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
              <div className="rounded flex flex-col text-center items-center justify-center w-[6rem] h-[1rem] pt-20">
                <Image
                  loading="lazy"
                  className="w-[10rem] h-[5rem] rounded-md text-xs object-cover"
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
                {isFav[index] ? <IconFavRed /> : <IconFavWhite />}
              </button>
            </div>
            <Link className="z-0" href="/detail/[name]" as={`/detail/${event.event_name}`}>
              <div>
                <h2 className="text-black text-[1.3rem] pt-2 pl-5 font-normal">{event.event_name}</h2>
                <p className="text-[#784DC7] text-[1rem] pt-2 pl-5 font-normal">{event.start_at.split("T")[0]}</p>
                <p className="text-black text-[.9rem] mt-2 pb-2.5 pl-5 font-light">{event.city}</p>
                <p className="text-black text-[1rem] pb-2.5 pl-5 font-normal">From $3,000.00</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="text-purpleOscuro flex items-center justify-center w-[40%] h-[3.4rem] rounded-md bg-pinkChip mb-10">
        <h4 className="font-medium">See More</h4>
      </div>
    </div>
  );
}
