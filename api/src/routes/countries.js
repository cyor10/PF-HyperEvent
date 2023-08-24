const { Router } = require("express")
const router = Router()
const { setCountries, getCountries, setStates, getStates } = require('../controllers/index')

router.post('/countries', setCountries)
router.get('/countries', getCountries)

router.post('/states', setStates)
router.get('/states/', getStates)

module.exports = router;