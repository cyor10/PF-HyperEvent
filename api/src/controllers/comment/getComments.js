const { Comment, User } = require('../../db')

async function getComments(req, res) {
    try {
        const allComments = await Comment.findAll({
            include: User,
            order: [['createdAt', 'DESC']],
        });
        res.status(200).json(allComments);
    } catch (error) {
        res.status(404).json({error: "No comments found"})
    }
}

async function getAproveComments(req, res) {
    try {
        const allComments = await Comment.findAll({
            where: { show: true },
            include: User,
            order: [['createdAt', 'DESC']],
        });
        res.status(200).json(allComments);
    } catch (error) {
        res.status(404).json({error: "No aprove comments found"})
    }
}

module.exports = {
    getComments,
    getAproveComments
}