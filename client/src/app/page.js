
"use client"
import React, { useState, useEffect } from "react";
import Carousel from "./components/Carousel/Carousel";
import Categories from "./components/Categories/Categories";
import axiosInstance from "../utils/axiosInstance";
import Link from "next/link";
import { IconFavWhite, IconFavRed } from "@/utils/svg/svg";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function LandingPage() {
  const [isFav, setIsFav] = useState([]);
  const [dataCarousel, setDataCarousel] = useState([]);
  const [categories, setCategories] = useState({ data: [] });
  const [eventsData, setEventsData] = useState({ events: [] });
  const session = await getServerSession(authOptions)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosInstance("/events");
        const slicedEvents = data.events.slice(0, 20);
        setEventsData({ events: slicedEvents });

        const carouselData = slicedEvents.slice(0, 5);
        setDataCarousel(carouselData);

        const categoriesResponse = await axiosInstance("/categories");
        const slicedCategories = categoriesResponse.data.slice(8, 15);
        setCategories({ data: slicedCategories });
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
      return updatedState;
    });
  };
  
  if(session){
    try {  
    let cloud = new FormData();
    cloud.set("username", session.user.username);
    cloud.set("email", session.user.email);
    cloud.set("name", session.user.name);
    cloud.set("last_name", session.user.last_name);
    cloud.set("password", session.user.password);
    cloud.set("user_image", session.user.user_image);
    const { data } = await axiosInstance.post("/signup", cloud, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (data.token) {
      localStorage.setItem("token", data.token);
      await axiosInstance("/protected", {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
}
  
  let { data } = await axiosInstance("/events");
  data.events = data.events.slice(0, 100);
  
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white">
      <Carousel>
        {dataCarousel &&
          dataCarousel.map((ev, index) => {
            return (
              <img
                className="w-[100%] h-80 object-cover"
                src={ev.event_image}
                alt="Descripción de la imagen"
                width={900}
                height={300}
                key={index}
              />
            );
          })}
      </Carousel>

      <div className="pt-10">
        <h1 className="text-5xl text-center pb-3 font-black leading-10">FIND YOUR EXPERIENCE</h1>
        <div className="w-[76%] mx-auto h-3 bg-black"></div>
      </div>

      <div className="flex flex-col text-start justify-center w-full pt-3 pb-14">
        <h2 className="text-1xl pl-6 pt-8 font-bold">CATEGORIES:</h2>
        <Categories>
          {categories.data &&
            categories.data.map((sl, index) => {
              return (
                <Link
                  className="w-[5rem] h-[6rem] mx-1.5 ml-5 mr-6"
                  key={index}
                  href={{
                    pathname: "/events",
                    query: { name: `${sl.name}` },
                  }}
                >
                  <div className="rounded flex flex-col text-center items-center justify-center w-[6rem] h-[1rem] pt-20">

                    <img
                      loading="lazy"
                      className="w-[10rem] h-[5rem] rounded-md text-xs object-cover"
                      src={sl.image}
                    />
                    <p className="pb-7 text-black">{sl.name}</p>
                  </div>
                </Link>
              );
            })}
        </Categories>
      </div>

      <div className="flex flex-col gap-6 w-[22rem] justify-center pb-10 pt-3">
        {data.events &&
          data.events.map((ev, index) => (
            <div className="bg-white shadow-md mx-auto w-[21rem] h-[19.5rem] rounded-lg flex flex-col relative" key={index}>
              <img
                className="w-[100%] h-[45%] object-cover rounded-t-lg z-100 relative"
                src={ev.event_image}
                alt="Descripción de la imagen"
                width={1200}
                height={300}
              />
              <div className="absolute flex justify-center rounded-full w-9 h-9 z-100 right-[1rem] bottom-[11.5rem] bg-white">
                <button className="" onClick={() => handleFavorite(index)}>
                  {isFav[index] ? <IconFavRed /> : <IconFavWhite />}
                </button>
              </div>
              <Link className="z-0" href="/detail/[name]" as={`/detail/${ev.event_name}`}>
                <div>
                  <h2 className="text-black text-[1.3rem] pt-2 pl-5 font-normal">{ev.event_name}</h2>
                  <p className="text-[#784DC7] text-[1rem] pt-2 pl-5 font-normal">{ev.start_at.split("T")[0]}</p>
                  <p className="text-black text-[.9rem] mt-2 pb-2.5 pl-5 font-light">{ev.city}</p>
                  <p className="text-black text-[1rem] pb-2.5 pl-5 font-normal">From $3,000.00</p>
                </div>
              </Link>
            </div>
          ))}
      </div>

      <div className="text-purpleOscuro flex items-center justify-center w-[40%] h-[3.4rem] rounded-md bg-[#E9DFFC] mb-10">
        <h4 className="font-medium">See More</h4>
      </div>
    </div>
  );
}
