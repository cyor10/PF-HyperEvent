const { Replys } = require('../../db')

async function editReply(req, res) {
    const {replyId, comment} = req.body
    try {
        const replyFounded = await Replys.findOne({where: { id: replyId }});
        if(!replyFounded) return res.status(404).json({error: "Reply not found"})
        replyFounded.comment = comment
        replyFounded.save();
        console.log("Reply edited sucessfully")
        res.status(200);
    } catch (error) {
        res.status(500).json({error: "Internal server error"})
    }
}

module.exports = editReply