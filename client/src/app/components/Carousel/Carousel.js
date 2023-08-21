"use client"
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function Carousel({ children: events }) {
  const [pag, setPage] = useState(0);

  const prev = () => {
    setPage((curr) => (curr === 0 ? curr : curr - 1));
  };

  const next = () => {
    setPage((curr) => (curr === events.length - 1 ? curr : curr + 1));
  };

  return (
    <div className="overflow-hidden relative">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${pag * 100}%)` }}
      >
        {events}
      </div>

      <div className="w-screen absolute inset-0 flex items-center justify-between p-4">
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
          disabled={pag === events.length - 1}
          className="p-1 rounded shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <FontAwesomeIcon
            className="text-gray-800"
            icon={faChevronRight}
          ></FontAwesomeIcon>
        </button>
      </div>

      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {events.map((_, i) => (
            <div
              key={i}
              className={`
              transition-all w-3 h-3 bg-white rounded-full
              ${pag === i ? "p-1" : "bg-opacity-50"}
            `}
            />
          ))}
        </div>
      </div>
    </div>
  );
}