const { Router } = require("express")
const router = Router()
const { setCountries, getCountries, setStates, getStates, setCities, getCities } = require('../controllers/index')

router.post('/countries', setCountries)
router.get('/countries', getCountries)

router.post('/states', setStates)
router.get('/states/', getStates)

router.post('/cities', setCities)
router.get('/cities/', getCities)

module.exports = router;