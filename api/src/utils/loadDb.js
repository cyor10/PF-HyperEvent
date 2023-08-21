require("dotenv").config();
const { API_KEY, API_URL } = process.env;
const axios = require("axios");
const { v4: uuidv4 } = require('uuid');

 async function getEvents(model) {
  try {
    let { data } = await axios.get(`${API_URL}/events?client_id=${API_KEY}`);
  
    const events = data.events.map( (event) => {
      const eventsBoilerPlate = {
        id: uuidv4(),
        event_name: event.performers[0].name,
        event_image: event.performers[0].image,
        start_at: event.announce_date,
        country: event.venue.country,
        city: event.venue.city,
        postal: event.venue.postal_code,
        adress: event.venue.location,
      };
      
    return eventsBoilerPlate
    });
   
    await model.bulkCreate(events)

    return 'Eventos cargados en la DB'
  } catch (error) {
    console.log(error);
  }
}

module.exports = getEvents;
