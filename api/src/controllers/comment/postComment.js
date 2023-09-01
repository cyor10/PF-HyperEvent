const { Comment } = require('../../db')

async function postComment(req, res) {
    const {user_id, comment} = req.body
    try {
        if(!user_id || !comment) res.status(404).json({error: "Missing properties: user_id or comment"})
        const createdComment = await Comment.create({
            user_id,
            comment
        })
        console.log("Comment created succesfully")
        return res.status(200).json({created: createdComment.dataValues})
    } catch (error) {
        res.status(500).json({error: "Internal server error"})
    }
}


module.exports = postComment