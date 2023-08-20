const {Router} = require("express")
const router = Router()
const {getEvents, createEvent} = require('../controllers/index')
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage })

router.get('/events', getEvents)

router.post('/events', upload.single("event_image"), createEvent) //definir si misma ruta u otra

module.exports = router;