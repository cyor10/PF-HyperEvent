const { Router } = require("express")
const router = Router()
const { getCategories, getEventsByCategory, createCategory, setCategories } = require('../controllers/index')

router.get('/categories', getCategories)
router.post('/categories', createCategory)
router.put('/categories/masive', setCategories)

router.get('/events-by-category', getEventsByCategory)

module.exports = router;