const getEvents = require('./getEvents')
const {signupUser, loginUser, protectedUser,} = require('./user')
const {createEvent} = require('./createEvent')
module.exports = {
    getEvents,
    signupUser,
    loginUser,
    protectedUser,
    createEvent
}