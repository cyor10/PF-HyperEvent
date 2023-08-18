"use client";
import React, { useState } from "react";
import axios from "axios";

function EventForm() {
  const [eventData, setEventData] = useState({
    price: 0.0,
    stock: 0,
    eventimage: null,
    category: "",
    rating: 0.0,
    review: "",
    eventname: "",
    orgname: "",
    place: "",
    eventdate: "",
  });

  function handleInputChange(event) {
    if (event.target.type === "file") {
      setEventData({ ...eventData, eventimage: event.target.files[0] });
    } else {
      setEventData({
        ...eventData,
        [event.target.name]: event.target.value,
      });
    }
  }
  console.log(eventData)
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let formData = new FormData();
      formData.set("id", Math.floor(Math.random() * 1000000))
      formData.set("price", eventData.price);
      formData.set("stock", eventData.stock);
      formData.set("file", eventData.eventimage);
      formData.set("category", eventData.category);
      formData.set("rating", eventData.rating);
      formData.set("review", eventData.review);
      formData.set("eventname", eventData.eventname);
      formData.set("orgname", eventData.orgname);
      formData.set("place", eventData.place);
      formData.set("eventdate", eventData.eventdate);
  
      const { data } = await axios.post("http://localhost:3001/events", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Puedes agregar otros headers necesarios aquí
        },
      });
      if(data.created) console.log(data.created)
      // Hacer algo con la respuesta del servidor si es necesario
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-black rounded shadow-md"
    >
      <div className="text-white mb-4">
        <label>Price:</label>
        <input
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="number"
          name="price"
          value={eventData.price}
          onChange={handleInputChange}
        />
      </div>
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
          name="eventimage"
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Category:</label>
        <input
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="category"
          value={eventData.category}
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
        <label>Event Name:</label>
        <input
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="eventname"
          value={eventData.eventname}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Organization Name:</label>
        <input
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="orgname"
          value={eventData.orgname}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Place:</label>
        <textarea
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="place"
          value={eventData.place}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Event Date:</label>
        <input
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="date"
          name="eventdate"
          value={eventData.eventdate}
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
