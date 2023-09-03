import React from 'react';
import Link from 'next/link';
import { IconArrowLeft } from '@/utils/svg/svg';

export default function page() {
  return (
    <div className="pt-24 ml-4 pb-10 px-[.5rem]">
      <Link href={'/create_event/form_step_2'}>
        <IconArrowLeft />
      </Link>

      <div className="flex flex-row items-center justify-center mr-4">
        <p className="text-[.8rem]">Step 4 of 4 </p>
        <div className="w-28 h-1 bg-purpleOscuro ml-2 rounded-md"></div>
      </div>

      <h3 className="pt-5 text-[2rem] font-bold mr-3 text-textForm ">
        Capacity and Tickets
      </h3>

      <form>
        <h4 className="pt-5 text-[1.6rem] font-bold  text-textForm">Summary</h4>

        <label className="text-[1rem] pt-5">
          How many people you plan on having in your event?
        </label>
        <input
          className="w-[95%] p-2 mb-5 mt-2 mr-4 rounded-md border-gray-400 border-2"
          placeholder="Capacity *"
        ></input>

        <h4 className="pt-5 text-[1.6rem] font-bold  text-textForm">
          Create ticket category
        </h4>

        <p className="text-[1rem] font-ligth mr-4 mb-5 pt-1">
          The best comes last! Create your ticket and give it your own imprint
          for your attendees
        </p>

        <div className="flex flex-row justify-evenly mr-6 mb-5">
          <button
            type="button"
            className="w-[47%] h-[2.5rem] rounded bg-[#F4EFFD]"
          >
            Paid
          </button>
          <button
            type="button"
            className="w-[47%] h-[2.5rem] rounded bg-[#F4EFFD]"
          >
            Free
          </button>
        </div>

        <label className="text-[1rem] mt-5">Ticket Name *</label>
        <input
          className="w-[95%] p-2 mb-5 mt-2 mr-4 rounded-md border-gray-400 border-2"
          placeholder="General Admission"
        ></input>

        <label className="text-[1rem] mt-5">Price *</label>
        <input
          className="w-[95%] p-2 mb-5 mt-2 mr-4 rounded-md border-gray-400 border-2"
          placeholder="Eg. $500,00"
        ></input>

        <div className="w-[100%] ml-[.1rem]">
          <button className="mr-4 w-[95%] mt-2 mx-auto h-12 bg-purpleOscuro rounded text-white">
            PUBLISH
          </button>
        </div>
      </form>
    </div>
  );
}
