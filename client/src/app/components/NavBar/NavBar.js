import React from "react";
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export default function NavBar() {
  return (
    <div className="flex justify-around gap-8 bg-gray-400 w-full h-16 items-center">
      <Link className="text-white font-bold py-1 px-2 my-4 rounded text-3xl" href="/">H</Link>
      <div className="flex flex-row g-5 justify-center bg-slate-100 py-2 px-5 rounded-lg">
        <FontAwesomeIcon className="c-red w-4" icon={faMagnifyingGlass}></FontAwesomeIcon>
        <hr className="bg-red"></hr>
      </div>
      <FontAwesomeIcon className="c-red w-4" icon={faBars}></FontAwesomeIcon>
    </div>
  );
}
