import React from 'react'

export default function PartFour({ formData, setFormData }) {
  return (
    <div className='text-black font-figtree md:px-[15rem]'>
      <div className="flex flex-row items-center justify-center mr-4">
        <p className="text-[.8rem]">Step 4 of 4 </p>
        <div className="w-28 h-1 bg-purpleOscuro ml-2 rounded-md"></div>
      </div>

        <h3 className="pt-5 text-[2rem] font-bold mr-3 text-textForm ">
        Capacity and Tickets
      </h3>

      <div>
        <h4 className="pt-5 text-[1.6rem] font-bold  text-textForm">Capacity</h4>

        <label className="text-[1rem] pt-5">
          How many people you plan on having in your event?
        </label>
        <input
          className="w-[95%] p-2 mb-5 mt-2 mr-4 rounded-md border-gray-400 border-2"
          placeholder="Capacity *" type='number'
          value={formData.stock}
          onChange={(e) => {
            setFormData({ ...formData, stock: e.target.value });
          }}
        ></input>

        <h4 className="pt-5 text-[1.6rem] font-bold  text-textForm">
          Create ticket category
        </h4>

        <p className="text-[1rem] font-ligth mr-4 mb-5 pt-1">
          The best comes last! Create your ticket and give it your own imprint
          for your attendees
        </p>

        <div className="flex flex-row items-start mb-5 gap-4">
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
          value={formData.place_name}
          onChange={(e) => {
            setFormData({ ...formData, place_name: e.target.value });
          }}
        ></input>

        <label className="text-[1rem] mt-5">Price *</label>
        <input
          className="w-[95%] p-2 mb-5 mt-2 mr-4 rounded-md border-gray-400 border-2"
          placeholder="Eg. $500,00" type='number'
          value={formData.price}
          onChange={(e) => {
            setFormData({ ...formData, price: e.target.value });
          }}
        ></input>
    </div>
    </div>
  )
}
