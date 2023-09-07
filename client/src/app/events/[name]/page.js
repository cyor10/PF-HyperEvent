"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import Cards from "@/app/components/Cards/Cards";

export default function FetchEvents({ params }) {
  const { name } = params
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMoreEvents, setHasMoreEvents] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstance(
          `/events-by-category?name=${name}`
        );
        const newEvents = data.events.lenth >= 6 ? data.events.slice(currentPage, 6 * (currentPage + 1)) : data.events.slice(currentPage, data.events.length)
        setEvents((prevEvents) => [...prevEvents, ...newEvents]);
        if (data.events.length < 6) setHasMoreEvents(false)
      } catch (error) {
        console.log(error);
      }
    })();
  }, [currentPage]);

  const handleSeeMoreClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="min-h-[66vh] mx-auto text-black font-figtree ">
      <h2 className="mx-auto mt-32 tracking-[-2.5px] font-bold text-[clamp(1.25rem,6vw,3rem)]">
        {name}
      </h2>
      <div className="flex mt-8 items-center">
        <p className="text-[22px] mr-5">Order by: </p>
        <select className='text-black w-[12vw] min-w-[100px] h-10 border-solid border-2 rounded-md text-center focus:outline-none mr-8' onChange={(event) => handleChange('date', event.target.value)} value={"orderFilters.date"}>
          <option value="" disabled>Date</option>
          <option value="newer">Newer</option>
          <option value="latest">Latest</option>
        </select>
        <select className='text-black h-10 w-[12vw] min-w-[100px] border-solid border-2 rounded-md text-center focus:outline-none' onChange={(event) => handleChange('sort', event.target.value)} value={"orderFilters.sort"}>
          <option value="" disabled>A to Z</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <h3 className="text-textForm text-[37px] font-bold mt-8 tracking-[-1.8px] mb-8">Most popular matches</h3>
      <Cards props={events} />
      {hasMoreEvents && (<button onClick={handleSeeMoreClick} className=" mt-16 mb-20 text-purpleOscuro mx-auto flex items-center justify-center w-[40%] h-[3.4rem] rounded-md bg-pinkChip cursor-pointer">
        <h4 className="font-medium">See More</h4>
      </button>)}
    </div>
  );
}

