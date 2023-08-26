require('dotenv').config()
const { API_KEY, API_URL } = process.env;
const axios = require("axios");

async function getTaxonomies(model) {
  try { const { data } = await axios.get(`${API_URL}/taxonomies?client_id=${API_KEY}`)
  const filteredTaxonomies = data?.taxonomies.filter(obj => {
      return obj.is_visible === true;
  });

  const saveCategories = filteredTaxonomies.map(async tax => {
      await model.findOrCreate({
          where: {id: tax.id, name: tax.name, image: tax.images["500_700"] || "https://s.france24.com/media/display/6aca8d1a-7783-11ea-9cf2-005056bf87d6/w:980/p:16x9/WEB%2005ABR%20DEPORTES%20PORTADA%20FOTO.webp%22%7D"}
      })
  }); 

  await Promise.all(saveCategories);

  return 'categories loaded in DB'
  } catch (error) {
    console.log(error)
  }
}


async function getEvents(model) {
  try {
    const allResponse = [];
    const numPages = 40; // Total number of pages

    // Create an array of promises for fetching events
    const fetchPromises = [];
    for (let page = 1; page <= numPages; page++) {
      const fetchPromise = axios.get(`${API_URL}/events?per_page=25&page=${page}&client_id=${API_KEY}`);
      fetchPromises.push(fetchPromise);
    }

    // Fetch events concurrently and concatenate responses
    const responses = await Promise.all(fetchPromises);
    responses.forEach(response => {
      allResponse.push(...response.data.events);
    });

    for (const element of allResponse) {
      const eventsBoilerPlate = {
        event_name: element.performers[0].name,
        event_image: element.performers[0].image,
        start_at: element.announce_date,
        country: element.venue.country,
        city: element.venue.city,
        postal: element.venue.postal_code,
        adress: element.venue.location,
      };
      const event = await model.create(eventsBoilerPlate);
      const category = element.performers[0].taxonomies.map(tax => tax.id);
      await event.addCategories(category);
    }

    return "Eventos cargados correctamente";
  } catch (error) {
    console.log(error);
    return 'Error al cargar Eventos-----!';
  }
}

module.exports ={
  getEvents,
  getTaxonomies
};
