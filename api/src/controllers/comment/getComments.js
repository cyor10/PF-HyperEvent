const { Comment } = require('../../db')

async function getComments(req, res) {
    try {
        const allComments = await Comment.findAll({
            order: [['createAt', 'DESC']]
        });
        res.status(200).json(allComments);
    } catch (error) {
        res.status(404).json({error: "No comments found"})
    }
}

module.exports = getComments