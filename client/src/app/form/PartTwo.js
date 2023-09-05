"use client"
import React from "react";

export default function PartTwo({ formData, setFormData }) {

  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <div>
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

      <div className="flex flex-col items-center">
        <input
          className="w-[95%] p-2 mt-4 mr-4 rounded-md border-gray-400 border-2"
          placeholder="Venue Name *"
          value={formData.place_name}
          onChange={(e) => {
            setFormData({ ...formData, place_name: e.target.value });
          }}
        ></input>

        <input
          className="w-[95%] p-2 mt-4 mr-4 rounded-md border-gray-400 border-2"
          placeholder="Adress 1 *"
          value={formData.address}
          onChange={(e) => {
            setFormData({ ...formData, address: e.target.value });
          }}
        ></input>

        <div className="flex flex-row items-center justify-center">
          <input
            className="w-[46%] p-2 mt-4 mr-4 rounded-md border-gray-400 border-2"
            placeholder="Country *"
            value={formData.country}
          onChange={(e) => {
            setFormData({ ...formData, country: e.target.value });
          }}
          ></input>

          <input
            className="w-[46%] p-2 mt-4 mr-4 rounded-md border-gray-400 border-2"
            placeholder="City *"
            value={formData.city}
          onChange={(e) => {
            setFormData({ ...formData, city: e.target.value });
          }}
          ></input>
        </div>

        <div className="flex flex-row items-center justify-center">
          <input
            className="w-[46%] p-2 mt-4 mr-4 rounded-md border-gray-400 border-2"
            placeholder="State/Province *"
            value={formData.state}
          onChange={(e) => {
            setFormData({ ...formData, state: e.target.value });
          }}
          ></input>
          <input
            className="w-[46%] p-2 mt-4 mr-4 rounded-md border-gray-400 border-2"
            placeholder="Postal Code*" type='number'
            value={formData.postal}
          onChange={(e) => {
            setFormData({ ...formData, postal: e.target.value });
          }}
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
            placeholder="11/12/2023" type='date'
            value={formData.start_at}
            min={currentDate}
          onChange={(e) => {
            setFormData({ ...formData, start_at: e.target.value });
          }}
          ></input>

          <label className="text-[1rem] pt-5 ml-1">Start time *</label>
          <input
            className="w-[95%] p-2 mt-4 mr-4 rounded-md border-gray-400 border-2"
            placeholder="19:00hs" type='number'
            value={formData.start_at}
            onChange={(e) => {
              setFormData({ ...formData, start_at: e.target.value });
            }}
          ></input>

          <label className="text-[1rem] pt-5 ml-1">Event End*</label>
          <input
            className="w-[95%] p-2 mt-4 mr-4 rounded-md border-gray-400 border-2"
            placeholder="11/12/2023" type='date'
            value={formData.end_at}
            min={formData.start_at}
            onChange={(e) => {
              setFormData({ ...formData, end_at: e.target.value });
            }}
          ></input>

          <label className="text-[1rem] pt-5 ml-1">End time *</label>
          <input
            className="w-[95%] p-2 mt-4 mr-4 rounded-md border-gray-400 border-2"
            placeholder="19:00hs" type='text'
            value={formData.end_at}
            onChange={(e) => {
              setFormData({ ...formData, end_at: e.target.value });
            }}
          ></input>
        </div>
    </div>
    </div>
  );
}