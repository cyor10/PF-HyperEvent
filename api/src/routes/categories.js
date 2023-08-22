const { Router } = require("express")
const router = Router()
const { getCategories, getEventsByCategory } = require('../controllers/index')

router.get('/categories', getCategories)

router.get('/events-by-category', getEventsByCategory)

module.exports = router;