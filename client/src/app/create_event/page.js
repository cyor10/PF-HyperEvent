"use client"
import React, { useState } from "react";
import axios from "axios";

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
      const { data } = await axios.post("http://localhost:3001/events", formData, {
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
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white rounded shadow-md"
    >
      <div>
        <label>Stock:</label>
        <input
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="number"
          name="stock"
          value={eventData.stock}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Upload image:</label>
        <input
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="file"
          name="event_image"
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Event Name:</label>
        <input
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="event_name"
          value={eventData.event_name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Organization Name:</label>
        <input
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="org_name"
          value={eventData.org_name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Place Name:</label>
        <input
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="place_name"
          value={eventData.place_name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="adress"
          value={eventData.adress}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>City:</label>
        <input
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="city"
          value={eventData.city}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Province:</label>
        <input
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="province"
          value={eventData.province}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Postal Code:</label>
        <input
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="postal"
          value={eventData.postal}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Country:</label>
        <input
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="country"
          value={eventData.country}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Start Date:</label>
        <input
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="date"
          name="start_at"
          value={eventData.start_at}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>End Date:</label>
        <input
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="date"
          name="end_at"
          value={eventData.end_at}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Rating:</label>
        <input
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="number"
          name="rating"
          value={eventData.rating}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Review:</label>
        <textarea
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="review"
          value={eventData.review}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="description"
          value={eventData.description}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Introduction:</label>
        <textarea
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="intro"
          value={eventData.intro}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Social Media:</label>
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
          Save
        </button>
      </div>
    </form>
  );
}

export default EventForm;