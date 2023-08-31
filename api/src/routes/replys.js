const { Router } = require("express")
const router = Router()
const { deleteReply, getReply, editReply, postReply } = require('../controllers/index')

router.delete("/deleteReply", deleteReply)
router.get("/getReply", getReply)
router.patch("/editReply", editReply)
router.post("/postReply", postReply)

module.exports = router;