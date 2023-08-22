"use client"

import {React, useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function Categories( {children :  categories}) {

  const [pag, setPage] = useState(0);

  const prev = () => {
    setPage((curr) => (curr === 0 ? curr : curr - 1));
  };

  const next = () => {
    setPage((curr) => (curr === categories.length - 1 ? curr : curr + 1));
  };

  return (
    <div className='overflow-hidden relative'>
      <div
        className="flex flex-row transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${pag * 100}%)` }}
      >
        {categories} {/* Renderiza los elementos categories aquí */}
      </div>

      <div className='overflow-hidden flex flex-row justify-evenly pb-20 gap-1'></div>

      <div className="w-screen absolute inset-0 flex items-center justify-between bottom-20 p-1">
        <button
          onClick={prev}
          className="p-1 rounded shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <FontAwesomeIcon
            className="text-gray-800"
            icon={faChevronLeft}
          ></FontAwesomeIcon>
        </button>

        <button
          onClick={next}
          className="p-1 rounded shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <FontAwesomeIcon
            className="text-gray-800"
            icon={faChevronRight}
          ></FontAwesomeIcon>
        </button>
      </div>
    </div>
  );
}
