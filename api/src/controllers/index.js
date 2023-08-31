const { signupUser, loginUser, protectedUser, } = require('./user')

const getEvents = require('./event/getEvents')
const { createEvent } = require('./event/createEvent')
const createMasiveEvents = require('./event/createMasiveEvents')
const setTopEvent = require('./event/setTopEvent')

const getCategories = require('./category/getCategories')
const { getEventsByCategory } = require('./category/getEventsByCategory')
const setCategories = require('./category/setCategories')
const createCategory = require('./category/createCategory')

const setCountries = require('./location/setCountries')
const getCountries = require('./location/getCountries')
const setStates = require('./location/setStates')
const getStates = require('./location/getStatesByCounty')
const setCities = require('./location/setCities')
const getCities = require('./location/getCitiesByState')

const { getSales, postSales } = require('./getSales')

module.exports = {
    signupUser,
    loginUser,
    protectedUser,

    getEvents,
    createEvent,
    createMasiveEvents,
    setTopEvent,

    getCategories,
    getEventsByCategory,
    createCategory,
    setCategories,

    setCountries,
    getCountries,
    setStates,
    getStates,
    setCities,
    getCities,

    getSales,
    postSales,
}