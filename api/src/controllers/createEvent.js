const {Events} = require('../db')
const cloudinary = require("../utils/cloudinaryConfig")

async function createEvent(req, res) {
    try {
        const {id, name, stock} = req.body
        const imgFile = req.file
        const bufferString = Buffer.from(imgFile.buffer).toString('base64')
        const imgToCloud = "data:" + imgFile.mimetype + ";base64," + bufferString;
        if(!id || !name || !stock) return res.status(404).json({error: 'Id, name and tickets is required.'})
        const image = await cloudinary.uploader.upload(imgToCloud, { public_id: imgFile.originalname })
        const createdEvents = await Events.create({id, name, stock, image})

        return res.json({events: createdEvents.dataValues})

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createEvent
}