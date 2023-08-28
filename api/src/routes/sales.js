const { Router } = require("express")
const router = Router()
const { getSales, postSales } = require('../controllers/index')

router.get('/sales', getSales);

router.post('/sales', postSales);

module.exports = router;