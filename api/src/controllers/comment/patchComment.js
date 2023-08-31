const { Comment } = require('../../db')

async function editComment(req, res) {
    const {comment, comment_id} = req.body
    try {
        const editedComment = await Comment.findOne({where: {id: comment_id}})
        if(!editedComment) res.status(404).json({error: "Comment not found"}) 
        editedComment.dataValues.comment = comment
        await editedComment.save()
        console.log("Comment edited sucessfully")
        res.status(200)
    } catch (error) {
        return res.status(500).json({error: "Server internal error"})
    }
}

module.exports = editComment