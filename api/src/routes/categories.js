const { Router } = require("express")
const router = Router()
const { getCategories } = require('../controllers/index')

router.get('/categories', getCategories)

module.exports = router;