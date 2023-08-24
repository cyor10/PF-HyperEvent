const getEvents = require('./getEvents')
const {signupUser, loginUser, protectedUser,} = require('./user')
const {createEvent} = require('./createEvent')
const getCategories = require('./getCategories')
const {getEventsByCategory} = require('./getEventsByCategory')
const setCountries = require('./setCountries')
const getCountries = require('./getCountries')

module.exports = {
    getEvents,
    createEvent,
    getCategories,
    signupUser,
    loginUser,
    protectedUser,
    getEventsByCategory,
    setCountries,
    getCountries
}