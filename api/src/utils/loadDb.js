require('dotenv').config()
const { API_KEY, API_URL } = process.env;
const axios = require("axios");
const sequelize = require('sequelize');

async function getTaxonomies(model) {
  try {
    const { data } = await axios.get(`${API_URL}/taxonomies?client_id=${API_KEY}`)
    const filteredTaxonomies = data?.taxonomies.filter(obj => {
      return obj.is_visible === true;
    });

    await model.findOrCreate({
      where: { name: "Mixed" },
      defaults: {
        name: "Mixed",
        image: "https://seatgeek.com/images/performers-landscape/generic-club-passes-3c1159/677148/500_700.jpg"
      }
    });

    const saveCategories = filteredTaxonomies.map(async tax => {
      await model.findOrCreate({
        where: { name: tax.name, image: tax.images["500_700"] || "https://seatgeek.com/images/performers-landscape/generic-club-passes-3c1159/677148/500_700.jpg" }
      })
    });

    await Promise.all(saveCategories);

    return 'Categories loaded in DB'
  } catch (error) {
    console.log(error)
  }
}


async function getEvents(model) {
  const { Category } = require('../db')
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
      let categoryId = null;

      if (element.performers && element.performers.length > 0 && element.performers[0].taxonomies) {
        const taxonomyName = element.performers[0].taxonomies[0]?.name;
    
        const category = await Category.findOne({ 
          where: sequelize.where(sequelize.fn('lower', sequelize.col('name')), taxonomyName)
        });
    
        if (category) {
          categoryId = category.id;
        } else {
          // If no matching category is found, use the "Mixed" category
          const mixedCategory = await Category.findOne({ where: { name: "Mixed" } });
          if (mixedCategory) {
            categoryId = mixedCategory.id;
          }
        }
      }

      const eventsBoilerPlate = {
        event_name: element.performers[0].name,
        event_image: element.performers[0].image,
        location: element.venue.location,
        place_name: element.venue.extended_address,
        address: element.venue.address,
        city: element.venue.city,
        country: element.venue.country,
        start_at: element.datetime_utc,
        postal: element.venue.postal_code,
        rating: element.venue.score,
        category_id: categoryId,
      };
      const event = await model.create(eventsBoilerPlate);
    }

    return "Eventos cargados correctamente";
  } catch (error) {
    console.log(error);
    return 'Error al cargar Ersventos-----!';
  }
}

module.exports = {
  getEvents,
  getTaxonomies
};
