require("dotenv").config();
const { API_KEY, API_URL } = process.env;
const axios = require("axios");
const { v4: uuidv4 } = require('uuid');
/* [
    {
      id: 1000000,
      name: 'sports',
      parent_id: null,
      document_source: [Object],
      rank: 0
    },
    {
      id: 1050000,
      name: 'soccer',
      parent_id: 1000000,
      document_source: [Object],
      rank: 0
    },
    {
      id: 1050100,
      name: 'mls',
      parent_id: 1050000,
      document_source: [Object],
      rank: 4
    }
  ], */
 
async function getTaxonomies(model) {
  try { const { data } = await axios.get(`${API_URL}/taxonomies?client_id=${API_KEY}`)
  //console.log(data.taxonomies)
  const filteredTaxonomies = data?.taxonomies.filter(obj => {
      return obj.is_visible === true;
  });

  const saveCategories = filteredTaxonomies.map(async tax => {
      await model.findOrCreate({
          where: {id: tax.id, name: tax.name, image: tax.images["500_700"] || "https://s.france24.com/media/display/6aca8d1a-7783-11ea-9cf2-005056bf87d6/w:980/p:16x9/WEB%2005ABR%20DEPORTES%20PORTADA%20FOTO.webp"} 
      })
  });

  await Promise.all(saveCategories);

  /* const totalCategories = await model.findAll({
      order: [['id', 'ASC']] // Order by ID in ascending order
  }); */
  return 'categories loaded in DB'
  } catch (error) {
    console.log(error)
  }
}

async function getEvents(model) {
  try {
    let { data } = await axios.get(`${API_URL}/events?client_id=${API_KEY}`);
    console.log(data.events.map(event=> event.performers[0].taxonomies.map(tax=>tax.id)))
    /* const events = data.events.map( (event) => {
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
    }); */
    for (let i = 0; i < data.events.length; i++) {
      const element = data.events[i];
      const eventsBoilerPlate = {
        id: uuidv4(),
        event_name: element.performers[0].name,
        event_image: element.performers[0].image,
        start_at: element.announce_date,
        country: element.venue.country,
        city: element.venue.city,
        postal: element.venue.postal_code,
        adress: element.venue.location,
      };
      const event = await model.create(eventsBoilerPlate)
      console.log(event.__proto__)
      const category = data.events[i].performers[0].taxonomies.map(tax=>tax.id)
      console.log(category)
      await event.addCategories(category)
    }
   
    //await model.bulkCreate(events)

    return 'Eventos cargados en la DB'
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