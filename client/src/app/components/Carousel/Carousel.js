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

  const itemsPerPage = 1; 

  return (
    <div className="overflow-hidden relative pt-[4rem]">
      <div className="flex justify-center items-center w-full h max-w-screen-md mx-auto h-[50vh] mt-6 transition-transform ease-out duration-500">
        {events.slice(pag * itemsPerPage, (pag + 1) * itemsPerPage).map((event, index) => (
          <div key={index} className="w-full">
            {event}
            
          </div>
        ))}
      </div>

      <div className=" absolute inset-0 flex items-center justify-between p-2 mb-28 mt-28"
      style={{ pointerEvents: "auto" }}>
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

      <div className="absolute bottom-4 left-0 right-0 text-center">
        <div className="flex items-center justify-center gap-2">
          {Array(Math.ceil(events.length / itemsPerPage))
            .fill()
            .map((_, i) => (
              <div
                key={i}
                onClick={() => setPage(i)}
                className={`w-3 h-3 bg-white rounded-full ${
                  pag === i ? "p-1" : "bg-opacity-50"
                } cursor-pointer`}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
