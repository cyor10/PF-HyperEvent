const getEvents = require('./event/getEvents')
const { signupUser, loginUser, protectedUser, } = require('./user')
const { createEvent } = require('./event/createEvent')
const getCategories = require('./category/getCategories')
const { getEventsByCategory } = require('./category/getEventsByCategory')
const setCountries = require('./location/setCountries')
const getCountries = require('./location/getCountries')
const setStates = require('./location/setStates')
const getStates = require('./location/getStatesByCounty')
const setCities = require('./location/setCities')
const getCities = require('./location/getCitiesByState')
const createCategory = require('./category/createCategory')
const setTopEvent = require('./event/setTopEvent')

module.exports = {
    getEvents,
    createEvent,
    getCategories,
    signupUser,
    loginUser,
    protectedUser,
    getEventsByCategory,
    setCountries,
    getCountries,
    setStates,
    getStates,
    setCities,
    getCities,
    createCategory,
    setTopEvent
}