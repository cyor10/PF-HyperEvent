import React from 'react';
import { FiSearch } from 'react-icons/fi'; // Importa un ícono de búsqueda desde alguna librería de íconos

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-top h-screen mt-5">
      <div className="text-4xl text-gray-600">
        <FiSearch />
      </div>
      <h2 className="mt-4 text-2xl font-bold text-gray-800">Oops! No results found</h2>
      <p className="mt-2 text-gray-600">Try adjusting your search criteria.</p>
    </div>
  );
}