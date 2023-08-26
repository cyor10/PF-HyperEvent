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
    let response = []
    let allResponse = []
    response = await Promise.all([
      await axios.get(`${API_URL}/events?per_page=25&page=1&client_id=${API_KEY}`),
      await axios.get(`${API_URL}/events?per_page=25&page=2&client_id=${API_KEY}`),
      // await axios.get(`${API_URL}/events?per_page=25&page=3&client_id=${API_KEY}`),
      // await axios.get(`${API_URL}/events?per_page=25&page=4&client_id=${API_KEY}`),
      // await axios.get(`${API_URL}/events?per_page=25&page=5&client_id=${API_KEY}`),
      // await axios.get(`${API_URL}/events?per_page=25&page=6&client_id=${API_KEY}`),
      // await axios.get(`${API_URL}/events?per_page=25&page=7&client_id=${API_KEY}`),
      // await axios.get(`${API_URL}/events?per_page=25&page=8&client_id=${API_KEY}`),
      // await axios.get(`${API_URL}/events?per_page=25&page=9&client_id=${API_KEY}`),
      // await axios.get(`${API_URL}/events?per_page=25&page=10&client_id=${API_KEY}`),
      // await axios.get(`${API_URL}/events?per_page=25&page=11&client_id=${API_KEY}`),
      // await axios.get(`${API_URL}/events?per_page=25&page=12&client_id=${API_KEY}`),
      // await axios.get(`${API_URL}/events?per_page=25&page=13&client_id=${API_KEY}`),
      // await axios.get(`${API_URL}/events?per_page=25&page=14&client_id=${API_KEY}`),
      // await axios.get(`${API_URL}/events?per_page=25&page=15&client_id=${API_KEY}`),
      // await axios.get(`${API_URL}/events?per_page=25&page=16&client_id=${API_KEY}`),
      // await axios.get(`${API_URL}/events?per_page=25&page=17&client_id=${API_KEY}`),
      // await axios.get(`${API_URL}/events?per_page=25&page=18&client_id=${API_KEY}`),
      // await axios.get(`${API_URL}/events?per_page=25&page=19&client_id=${API_KEY}`),
      // await axios.get(`${API_URL}/events?per_page=25&page=20&client_id=${API_KEY}`),
      // await axios.get(`${API_URL}/events?per_page=25&page=21&client_id=${API_KEY}`),
      // await axios.get(`${API_URL}/events?per_page=25&page=22&client_id=${API_KEY}`),
      // await axios.get(`${API_URL}/events?per_page=25&page=23&client_id=${API_KEY}`),
      // await axios.get(`${API_URL}/events?per_page=25&page=24&client_id=${API_KEY}`),
      // await axios.get(`${API_URL}/events?per_page=25&page=25&client_id=${API_KEY}`),
      // await axios.get(`${API_URL}/events?per_page=25&page=26&client_id=${API_KEY}`),
      // await axios.get(`${API_URL}/events?per_page=25&page=27&client_id=${API_KEY}`),
      // await axios.get(`${API_URL}/events?per_page=25&page=28&client_id=${API_KEY}`),
      // await axios.get(`${API_URL}/events?per_page=25&page=29&client_id=${API_KEY}`),
      // await axios.get(`${API_URL}/events?per_page=25&page=30&client_id=${API_KEY}`),
      // await axios.get(`${API_URL}/events?per_page=25&page=31&client_id=${API_KEY}`),
      // await axios.get(`${API_URL}/events?per_page=25&page=32&client_id=${API_KEY}`),
      // await axios.get(`${API_URL}/events?per_page=25&page=33&client_id=${API_KEY}`),
      // await axios.get(`${API_URL}/events?per_page=25&page=34&client_id=${API_KEY}`),
      // await axios.get(`${API_URL}/events?per_page=25&page=35&client_id=${API_KEY}`),
      // await axios.get(`${API_URL}/events?per_page=25&page=36&client_id=${API_KEY}`),
      // await axios.get(`${API_URL}/events?per_page=25&page=37&client_id=${API_KEY}`),
      // await axios.get(`${API_URL}/events?per_page=25&page=38&client_id=${API_KEY}`),
      // await axios.get(`${API_URL}/events?per_page=25&page=39&client_id=${API_KEY}`),
      // await axios.get(`${API_URL}/events?per_page=25&page=40&client_id=${API_KEY}`),

    ])
    
    response.forEach(element => {
      allResponse = allResponse.concat(element.data.events);
    });
    console.log(allResponse.length)
    //let { data } = await axios.get(`${API_URL}/events?per_page=25&page=2&client_id=${API_KEY}`);
    for (let i = 0; i < allResponse.length; i++) {
      const element = allResponse[i];
      const eventsBoilerPlate = {
        event_name: element.performers[0].name,
        event_image: element.performers[0].image,
        start_at: element.announce_date,
        country: element.venue.country,
        city: element.venue.city,
        postal: element.venue.postal_code,
        adress: element.venue.location,
      };
      const event = await model.create(eventsBoilerPlate)
      const category = element.performers[0].taxonomies.map(tax=>tax.id)
      await event.addCategories(category)
    }
      return "Eventos cargados correctamente"
  } catch (error) {
    console.log(error)
    return 'Error al cargar Eventos-----!';
  }
}


module.exports ={
  getEvents,
  getTaxonomies
};

/* Events.__proto__:
_isAttribute: [Function (anonymous)],
  getUsers: [Function (anonymous)],
  countUsers: [Function (anonymous)],
  hasUser: [Function (anonymous)],
  hasUsers: [Function (anonymous)],
  setUsers: [Function (anonymous)],
  addUser: [Function (anonymous)],
  addUsers: [Function (anonymous)],
  removeUser: [Function (anonymous)],
  removeUsers: [Function (anonymous)],
  createUser: [Function (anonymous)],
  getCategories: [Function (anonymous)],
  countCategories: [Function (anonymous)],
  hasCategory: [Function (anonymous)],
  hasCategories: [Function (anonymous)],
  setCategories: [Function (anonymous)],
  addCategory: [Function (anonymous)],
  addCategories: [Function (anonymous)],
  removeCategory: [Function (anonymous)],
  removeCategories: [Function (anonymous)],
  createCategory: [Function (anonymous)],
  getTickets: [Function (anonymous)],
  countTickets: [Function (anonymous)],
  hasTicket: [Function (anonymous)],
  hasTickets: [Function (anonymous)],
  setTickets: [Function (anonymous)],
  addTicket: [Function (anonymous)],
  addTickets: [Function (anonymous)],
  removeTicket: [Function (anonymous)],
  removeTickets: [Function (anonymous)],
  createTicket: [Function (anonymous)] */