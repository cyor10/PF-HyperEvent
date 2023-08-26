const { Router } = require('express');
const router = Router();
const events = require('./events')
const users = require('./users');
const categories = require('./categories')
const verifyToken = require('../utils/verifyToken');
const mercadopago = require('./mercadopago'); 
const countries = require('./countries')

router.use('/', events)
router.use('/', users)
router.use('/', categories)
router.use('/', countries)

router.use('/protected', verifyToken)
router.use('/protected/pagar', mercadopago); 

module.exports = router;