const { Router } = require("express")
const router = Router()
const { getEvents, createEvent, setTopEvent, createMasiveEvents } = require('../controllers/index')
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage })

router.get('/events', getEvents)

router.post('/events', upload.single("event_image"), createEvent)

router.patch('/events/:id', setTopEvent)
router.put('/events/masive', createMasiveEvents)

module.exports = router;