const {
  signupUser,
  loginUser,
  protectedUser,
  loginGoogleUser,
} = require('./user');

const getEvents = require('./event/getEvents');
const { createEvent } = require('./event/createEvent');
const createMasiveEvents = require('./event/createMasiveEvents');
const setTopEvent = require('./event/setTopEvent');
const getTopEvents = require('./event/getTopEvents');

const getCategories = require('./category/getCategories');
const { getEventsByCategory } = require('./category/getEventsByCategory');
const setCategories = require('./category/setCategories');
const createCategory = require('./category/createCategory');

const setCountries = require('./location/setCountries');
const getCountries = require('./location/getCountries');
const setStates = require('./location/setStates');
const getStates = require('./location/getStatesByCounty');
const setCities = require('./location/setCities');
const getCities = require('./location/getCitiesByState');

const { getSales, postSales } = require('./getSales');

const deleteComment = require('./comment/deleteComment');
const { getComments, getAproveComments } = require('./comment/getComments');
const editComment = require('./comment/patchComment');
const postComment = require('./comment/postComment');

const deleteReply = require('./replys/deleteReply');
const getReply = require('./replys/getReply');
const editReply = require('./replys/patchReply');
const postReply = require('./replys/postReply');

module.exports = {
  signupUser,
  loginUser,
  protectedUser,
  loginGoogleUser,
  getEvents,
  createEvent,
  createMasiveEvents,
  setTopEvent,
  getTopEvents,
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
  deleteComment,
  getComments,
  editComment,
  postComment,
  deleteReply,
  getReply,
  editReply,
  postReply,
  getAproveComments,
};
