const { Router } = require('express');
const router = Router();
const events = require('./events')
const users = require('./users');
const sales = require("./sales")
const categories = require('./categories')
const verifyToken = require('../utils/verifyToken');
const mercadopago = require('./mercadopago'); 
const countries = require('./countries')
const comments = require('./comments')

router.use('/', comments)
router.use('/', events)
router.use('/', users)
router.use('/', categories)
router.use('/', countries)
router.use('/', sales)
router.use('/protected', verifyToken)
router.use('/pagar', mercadopago); 

module.exports = router;