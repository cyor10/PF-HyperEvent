"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

export default function PartOne({ formData, setFormData, errors, setErrors, validateEventField }) {
  const [categories, setCategories] = useState([]);

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

  const handleError = (evt)=>{
    const inputsErrors = { ...errors , [evt.target.name] : evt.target.value }
    const iptError = validateEventField(inputsErrors)
    setErrors(iptError)
  }



  return (
    <div>
          <div className='flex flex-row items-center justify-center mr-4'>
        <p className='text-[.8rem]'>Step 1 of 4 </p>
        <div className='w-8 h-1 bg-purpleOscuro ml-2 rounded-md'></div>
        <div className='w-20 h-1 bg-[#F4EFFD] rounded-r-md'></div>
    </div>

      <h3 className="pt-5 text-[2rem] font-bold mr-3 text-textForm">
        Let’s begin with the basics
      </h3>
      <p className="text-[1rem] font-ligth mr-4">
        Name your event and tell event-goers why they should come. Add details
        that highlight what makes it unique.
      </p>

      <div className="pt-8">
        <label className="text-[1rem] pt-5 ml-1">Event title</label>
        <input
          className="w-[95%] p-2 mb-5 mt-2 mr-4 rounded-md border-gray-400 border-2"
          placeholder="Be clear an descriptive"
          name="event_name"
          value={formData.event_name}
          onChange={(e) => {
            setFormData({ ...formData, event_name: e.target.value }),
            handleError(e)
          }}
          

        ></input>
  {errors.event_name && (
          <p className="text-red-700 pb-5 ml-1">{errors.event_name}</p>
        )}

        <label className="text-[1rem] pt-5 ml-1">Organizer name</label>
        <input
          className="w-[95%] p-2 mb-5 mt-2 mr-4 rounded-md border-gray-400 border-2"
          placeholder="Enter your org name"
          name="org_name"
          value={formData.org_name}
          onChange={(e) => {
            setFormData({ ...formData, org_name: e.target.value });
            handleError(e)
          }}
        ></input>
        {errors.org_name && (
          <p className="text-red-700 pb-5 ml-1">{errors.org_name}</p>
        )}

      </div>

      <h4 className="pt-5 text-[1.6rem] font-bold text-textForm">Categories</h4>
      <p className="text-[1rem] font-ligth mr-4">
        Improve discoverability of your event by adding categories relevant to
        the subject matter.
      </p>

      <select
  className="w-[95%] pt-2 pb-2 mt-5 mb-4 pl-2  border-gray-400 border-2 rounded-md"
  value={formData.category}
  defaultValue={formData.category[1]}
  onChange={(e) => {
    setFormData({ ...formData, category: e.target.value });
  }}
>
  <option disabled value="">
    (Select Categories)
  </option>
  {Array.isArray(categories) &&
    categories?.map((categ, index) => {
      return (
        <option value={categ.name} key={index}>
          {categ.name}
        </option>
      );
    })}
</select>
    </div>
  );
}
