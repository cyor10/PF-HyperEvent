const {Router} = require("express")
const router = Router()
const {getEvents, createEvent} = require('../controllers/index')

router.get('/events', getEvents)

router.post('/events', createEvent) //definir si misma ruta u otra

module.exports = router;