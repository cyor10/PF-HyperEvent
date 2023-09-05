"use client";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { validateEventField } from "@/validate/validate";
import { IconArrowLeft } from "@/utils/svg/svg";
import Link from "next/link";

function EventForm() {

  const [categories, setCategories] = useState([]);
  const [ page, setPage ] = useState(0)

  const [eventData, setEventData] = useState({
    event_name: '',
    org_name: '',
    category: '',
    address: '',
    country: '',
    city: '',
    state: '',
    postal: '',
    start_at: '',
    end_at: '',
    intro: '',
    description: '',
    social_media: [],
    event_image: null,
    stock: 0,
    place_name: '',
    price: 0,
    //TODO: location: {lat: 0, lon: 0 }
  });
  //console.log(eventData)
  /* 
event_name!, org_name!, category, location, place_name!, address!, city!, state!, country!, postal!, start_at!, end_at!, intro!, description!, social_media!, price!, stock! */

  const [errors, setErrors] = useState({
    event_name: '',
    org_name: '',
    category: '',
    address: '',
    country: '',
    city: '',
    state: '',
    postal: '',
    start_at: '',
    end_at: '',
    intro: '',
    description: '',
    social_media: [],
    event_image: null,
    stock: 0,
    place_name: '',
    price: 0,
    //TODO: location: {lat: 0, lon: 0 }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await axiosInstance("/categories");
        setCategories([...categoriesResponse.data]);
        console.log(categories);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='pt-24 ml-4 pb-10 px-[.5rem]'>
    <Link href={"/"}>
    <IconArrowLeft/>
    </Link>
    <div className='flex flex-row items-center justify-center mr-4'>
        <p className='text-[.8rem]'>Step 1 of 4 </p>
        <div className='w-8 h-1 bg-purpleOscuro ml-2 rounded-md'></div>
        <div className='w-20 h-1 bg-[#F4EFFD] rounded-r-md'></div>
    </div>

    <h3 className='pt-5 text-[2rem] font-bold mr-3 text-textForm'>Let’s begin with the basics</h3>
    <p className='text-[1rem] font-ligth mr-4'>Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.</p>

    <form>
      <div className="pt-8">

    <label className='text-[1rem] pt-5 ml-1'>Event title</label>
                <input className='w-[95%] p-2 mb-5 mt-2 mr-4 rounded-md border-gray-400 border-2' placeholder='Be clear an descriptive'></input>

        <label className='text-[1rem] pt-5 ml-1'>Organizer name</label>
        <input className='w-[95%] p-2 mb-5 mt-2 mr-4 rounded-md border-gray-400 border-2' placeholder='Enter your org name'></input>
    </div>

    <h4 className='pt-5 text-[1.6rem] font-bold text-textForm'>Categories</h4>
    <p className='text-[1rem] font-ligth mr-4'>
    Improve discoverability of your event by adding categories relevant to the subject matter.
    </p>
    
    <select className="w-[95%] pt-2 pb-2 mt-5 mb-4 pl-2  border-gray-400 border-2 rounded-md">
            <option value="Default" disabled selected>(Select Categories)</option>
            {Array.isArray(categories) &&
              categories?.map((categ, index) => {
                return (
                  <option value={categ.name} key={index} >
                    {categ.name}
                  </option>
                );
              })}
    </select>

    <Link className='w-[100%] mt-20' href={"/create_event/form_step_1"}>
            <button className='mr-4 w-[95%] mt-5 mx-auto h-12 bg-purpleOscuro rounded text-white'>NEXT</button>
    </Link>
    </form>
    </div>
  );
}

export default EventForm;
