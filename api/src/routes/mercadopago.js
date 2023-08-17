const express = require("express");
const router = express.Router();
const {
    pagar,
} = require("../controllers/mercado_pago");

//todo: ROUTE x*xx**xxx***
router.post("/", pagar);




module.exports = router;