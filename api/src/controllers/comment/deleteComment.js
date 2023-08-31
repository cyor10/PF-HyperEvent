const { Comment } = require('../../db')

async function deleteComment(req, res) {
    const {comment_id} = req.body
    try {
        const deletedComment = await Comment.findOne({where: {id: comment_id}})
        if(!deletedComment) return res.status(404).json({error: "Comment not found"})
        deleteComment.destroy()
        console.log("Comment deleted sucessfully")
        return res.status(200)
    } catch (error) {
        return res.status(500).json({error: "Internal server error"})
    }
}

module.exports = deleteComment