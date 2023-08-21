const getEvents = require('./getEvents')
const {signupUser, loginUser, protectedUser,} = require('./user')
const {createEvent} = require('./createEvent')
const getCategories = require('./getCategories')

module.exports = {
    getEvents,
    createEvent,
    getCategories,
    signupUser,
    loginUser,
    protectedUser,
}