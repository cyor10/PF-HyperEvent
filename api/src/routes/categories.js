const { Router } = require("express")
const router = Router()
const { getCategories, getEventsByCategory, createCategory } = require('../controllers/index')

router.get('/categories', getCategories)
router.post('/categories', createCategory)

router.get('/events-by-category', getEventsByCategory)

module.exports = router;