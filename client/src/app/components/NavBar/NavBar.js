import React from "react";
import Link from 'next/link'
export default function NavBar() {
  return (
    <nav className="flex justify-center gap-8">
      <Link className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" href="/">Home</Link>
      <Link className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" href="/events">Eventos</Link>
      <Link className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" href="/create_event">Crear Evento</Link>
    </nav>
  );
}
