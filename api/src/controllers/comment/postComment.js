const { Comment, User } = require('../../db')


async function postComment(req, res) {
    const {user_id, comment, rating} = req.body
    console.log(req.body)
    try {
        if(!user_id || !comment || !rating) res.status(404).json({error: "Missing properties: user_id or comment"})
        const createdComment = await Comment.create({
            user_id,
            comment,
            rating,
        })
        console.log(createdComment.__proto__)
        const userComment = await User.findOne({where:{id: user_id}})
        await createdComment.setUser(userComment)
        console.log("Comment created succesfully")
        return res.status(200).json({created: createdComment.dataValues})
    } catch (error) {
        res.status(500).json({error: "Internal server error"})
    }
}



module.exports = postComment