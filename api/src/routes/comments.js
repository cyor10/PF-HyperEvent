const { Router } = require("express")
const router = Router()
const { deleteComment, getComments, editComment, responseComment, postComment } = require('../controllers/index')

router.delete("/deleteComment", deleteComment)
router.get("/allComments", getComments)
router.patch("/editComment", editComment)
router.patch("/responseComment", responseComment)
router.post("/postComment", postComment)

module.exports = router;