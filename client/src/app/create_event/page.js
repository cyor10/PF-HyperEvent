'use client'
import React, { useState } from "react";
import axiosInstance from '../../utils/axiosInstance';

function EventForm() {
  const [eventData, setEventData] = useState({
    stock: 0,
    event_image: "",
    event_name: "",
    org_name: "",
    place_name: "",
    adress: [""],
    city: "",
    province: "",
    postal: "",
    country: "",
    start_at: "",
    end_at: "",
    rating: 0.0,
    review: "",
    description: "",
    intro: "",
    social_media: [""],
  });

  function handleInputChange(event) {
    const { name, value, type } = event.target;

    if (type === "file") {
      setEventData({ ...eventData, [name]: event.target.files[0] });
    } else {
      setEventData({
        ...eventData,
        [name]: value,
      });
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let formData = new FormData();

      for (const [key, value] of Object.entries(eventData)) {
        formData.append(`${key}`, value);
      }
      console.log(formData.get("event_image"))
      const { data } = await axiosInstance.post("/events", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.created) {
        console.log("Event created:", data.created);
        // Puedes hacer algo con la respuesta del servidor si es necesario
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-start mt-4">
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-black rounded shadow-md rounded-md mt-4"
    >
        <h1 className="text-2xl font-semibold mb-4 text-gray-700 text-center">Form to create </h1>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Stock:</label>
        <input
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="number"
          name="stock"
          value={eventData.stock}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Upload image:</label>
        <input
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="file"
          name="event_image"
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Event Name:</label>
        <input
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="event_name"
          value={eventData.event_name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Organization Name:</label>
        <input
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="org_name"
          value={eventData.org_name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Place Name:</label>
        <input
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="place_name"
          value={eventData.place_name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Address:</label>
        <input
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="adress"
          value={eventData.adress}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">City:</label>
        <input
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="city"
          value={eventData.city}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Province:</label>
        <input
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="province"
          value={eventData.province}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Postal Code:</label>
        <input
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="postal"
          value={eventData.postal}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Country:</label>
        <input
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="country"
          value={eventData.country}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Start Date:</label>
        <input
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="date"
          name="start_at"
          value={eventData.start_at}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">End Date:</label>
        <input
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="date"
          name="end_at"
          value={eventData.end_at}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Rating:</label>
        <input
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="number"
          name="rating"
          value={eventData.rating}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Review:</label>
        <textarea
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="review"
          value={eventData.review}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Description:</label>
        <textarea
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="description"
          value={eventData.description}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Introduction:</label>
        <textarea
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="intro"
          value={eventData.intro}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Social Media:</label>
        <input
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="social_media"
          value={eventData.social_media}
          onChange={handleInputChange}
        />
      </div>
      <div className="text-center mt-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Create Event
        </button>
      </div>
    </form>
    </div>
  );
}

export default EventForm;