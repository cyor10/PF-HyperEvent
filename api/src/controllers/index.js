const getEvents = require('./getEvents')
const {signupUser, loginUser, protectedUser,} = require('./user')
const {createEvent} = require('./createEvent')
const getCategories = require('./getCategories')
const {getEventsByCategory} = require('./getEventsByCategory')

module.exports = {
    getEvents,
    createEvent,
    getCategories,
    signupUser,
    loginUser,
    protectedUser,
    getEventsByCategory
}