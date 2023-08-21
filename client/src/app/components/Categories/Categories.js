"use client"

import {React, useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function Categories( {children :  slides}) {

    const [pag, setPage] = useState(0);

    const prev = () => {
        setPage((curr) => (curr === 0 ? curr : curr - 1));
      };
    
      const next = () => {
        setPage((curr) => (curr === slides.length - 1 ? curr : curr + 1));
      };


  return (
    <div className='overflow-hidden relative'>
        <div className='overflow-hidden flex flex-row justify-evenly pb-20 gap-1'>{slides}</div>

        <div className="w-screen absolute inset-0 flex items-center justify-between bottom-20 p-1">
        <button
          onClick={prev}
          disabled={pag === 0}
          className="p-1 rounded shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <FontAwesomeIcon
            className="text-gray-800"
            icon={faChevronLeft}
          ></FontAwesomeIcon>
        </button>

        <button
          onClick={next}
          disabled={pag === slides.length - 1}
          className="p-1 rounded shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <FontAwesomeIcon
            className="text-gray-800"
            icon={faChevronRight}
          ></FontAwesomeIcon>
        </button>
      </div>
    </div>

    
  )
}
