const { Replys } = require('../../db')

async function deleteReply(req, res) {
    const {replyId} = req.body
    try {
        const deletedReply = await Replys.findOne({where: {id: replyId}})
        if(!deletedReply) return res.status(404).json({error: "Reply not found"})
        deletedReply.destroy()
        console.log("Reply deleted sucessfully")
        return res.status(200)
    } catch (error) {
        return res.status(500).json({error: "Internal server error"})
    }
}

module.exports = deleteReply