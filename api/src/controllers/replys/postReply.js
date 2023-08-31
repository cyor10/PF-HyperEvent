const { Replys } = require('../../db')

async function postReply(req, res) {
    const {userId, commentId, comment} = req.body
    try {
        if(!userId || commentId || !comment) res.status(404).json({error: "Missing properties: user_id or comment"})
        const createdReply = await Replys.create({
            user_id: userId,
            comment_id: commentId,
            comment
        })
        console.log("Reply created succesfully")
        return res.status(200).json({created: createdReply.dataValues})
    } catch (error) {
        res.status(500).json({error: "Internal server error"})
    }
}


module.exports = postReply