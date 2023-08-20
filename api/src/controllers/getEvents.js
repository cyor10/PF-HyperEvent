require('dotenv').config()
const { API_KEY, API_URL } = process.env;
const axios = require('axios');
const { Event } = require('../db');

async function getEvents(req, res) {
  try {
    // Obtener eventos de la API externa
    const externalResponse = await axios.get(`${API_URL}/events?client_id=${API_KEY}`);
    const externalEvents = externalResponse.data.events;

    // Obtener eventos de la base de datos local
    const dbEvents = await Event.findAll();

    // Combinar los eventos de la API externa y los eventos de la base de datos local
    const allEvents = [...externalEvents, ...dbEvents];

    return res.json({ events: allEvents });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = getEvents;