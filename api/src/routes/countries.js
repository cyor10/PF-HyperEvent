const { Router } = require("express")
const router = Router()
const { setCountries, getCountries } = require('../controllers/index')

router.post('/countries', setCountries)
router.get('/countries', getCountries)

module.exports = router;