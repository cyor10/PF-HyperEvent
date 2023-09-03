import React from 'react';
import { IconArrowLeft } from '@/utils/svg/svg';
import Link from 'next/link';

export default function FormStep1() {
  return (
    <div className="pt-24 ml-4 pb-10 px-[.5rem]">
      <Link href={'/create_event'}>
        <IconArrowLeft />
      </Link>
      <div className="flex flex-row items-center justify-center mr-4">
        <p className="text-[.8rem]">Step 2 of 4 </p>
        <div className="w-14 h-1 bg-purpleOscuro ml-2 rounded-md"></div>
        <div className="w-14 h-1 bg-[#F4EFFD] rounded-r-md"></div>
      </div>

      <h3 className="pt-5 text-[2rem] font-bold mr-3 text-textForm">
        Location, date and time
      </h3>

      <h4 className="pt-5 text-[1.6rem] font-bold text-textForm">Location</h4>
      <p className="text-[1rem] font-ligth mr-4">
        Help people in the area discover your event and let attendees know where
        to show up.
      </p>

      <form className="flex flex-col items-center">
        <input
          className="w-[95%] p-2 mt-4 mr-4 rounded-md border-gray-400 border-2"
          placeholder="Venue Name *"
        ></input>

        <input
          className="w-[95%] p-2 mt-4 mr-4 rounded-md border-gray-400 border-2"
          placeholder="Adress 1 *"
        ></input>

        <div className="flex flex-row items-center justify-center">
          <input
            className="w-[46%] p-2 mt-4 mr-4 rounded-md border-gray-400 border-2"
            placeholder="Country *"
          ></input>

          <input
            className="w-[46%] p-2 mt-4 mr-4 rounded-md border-gray-400 border-2"
            placeholder="City *"
          ></input>
        </div>

        <div className="flex flex-row items-center justify-center">
          <input
            className="w-[46%] p-2 mt-4 mr-4 rounded-md border-gray-400 border-2"
            placeholder="State/Province *"
          ></input>
          <input
            className="w-[46%] p-2 mt-4 mr-4 rounded-md border-gray-400 border-2"
            placeholder="Postal Code*"
          ></input>
        </div>
        <div>
          <h3 className="pt-5 text-2xl font-bold text-textForm">
            Date and Time
          </h3>

          <p className="text-[1.1rem] font-ligth mr-4 pt-1">
            Tell event-goers when your event starts and ends so they can make
            plans to attend.
          </p>
        </div>

        <div className="flex flex-col items-start w-[100%]">
          <label className="text-[1rem] pt-5 ml-1">Event Starts *</label>
          <input
            className="w-[95%] p-2 mt-4 mr-4 rounded-md border-gray-400 border-2"
            placeholder="11/12/2023"
          ></input>

          <label className="text-[1rem] pt-5 ml-1">Start time *</label>
          <input
            className="w-[95%] p-2 mt-4 mr-4 rounded-md border-gray-400 border-2"
            placeholder="11/12/2023"
          ></input>

          <label className="text-[1rem] pt-5 ml-1">Event End*</label>
          <input
            className="w-[95%] p-2 mt-4 mr-4 rounded-md border-gray-400 border-2"
            placeholder="11/12/2023"
          ></input>

          <label className="text-[1rem] pt-5 ml-1">End time *</label>
          <input
            className="w-[95%] p-2 mt-4 mr-4 rounded-md border-gray-400 border-2"
            placeholder="11/12/2023"
          ></input>
        </div>
        <Link className="w-[100%] pt-8" href={'/create_event/form_step_2'}>
          <button className="mr-4 w-[95%] mx-auto h-12 bg-purpleOscuro rounded text-white">
            NEXT
          </button>
        </Link>
      </form>
    </div>
  );
}
