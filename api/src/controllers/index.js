const getEvents = require('./getEvents')
const { signupUser, loginUser, protectedUser, } = require('./user')
const { createEvent } = require('./createEvent')
const getCategories = require('./getCategories')
const { getEventsByCategory } = require('./getEventsByCategory')
const setCountries = require('./location/setCountries')
const getCountries = require('./location/getCountries')
const setStates = require('./location/setStates')
const getStates = require('./location/getStatesByCounty')
const setCities = require('./location/setCities')
const getCities = require('./location/getCitiesByState')

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
    getCities
}