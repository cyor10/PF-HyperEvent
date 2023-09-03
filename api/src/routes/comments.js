const { Router } = require("express")
const router = Router()
const { deleteComment, getComments, editComment, postComment, getAproveComments } = require('../controllers/index')

router.delete("/deleteComment", deleteComment)
router.get("/allComments", getComments)
router.get("/aproveComments", getAproveComments)
router.patch("/editComment", editComment)
router.post("/postComment", postComment)

module.exports = router;