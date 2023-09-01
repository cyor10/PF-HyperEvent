const { Replys } = require('../../db')

async function getReply(req, res) {
    const {replyId} = req.query
    try {
        const replyFounded = await Replys.findOne({where: { id: replyId }});
        if(!replyFounded) return res.status(404).json({error: "Reply not found"})
        res.status(200).json(replyFounded);
    } catch (error) {
        res.status(500).json({error: "Internal server error"})
    }
}

module.exports = getReply