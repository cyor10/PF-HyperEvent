const {Event} = require('../db')
const cloudinary = require("../utils/cloudinaryConfig")
const { v4: uuidv4 } = require('uuid');

async function createEvent(req, res) {
    const id = uuidv4();
    try {
        const { price, stock, category, rating, review, eventname, orgname, place, eventdate} = req.body
        const imgFile = req.file
        const bufferString = Buffer.from(imgFile.buffer).toString('base64')
        const imgToCloud = "data:" + imgFile.mimetype + ";base64," + bufferString;
        if(!id || !price || !stock || !category || !rating || !review || !eventname || !orgname || !place || !eventdate || !imgFile) return res.status(404).json({error: 'Id, name and tickets is required.'})
        const eventimage = await cloudinary.uploader.upload(imgToCloud, { public_id: imgFile.originalname })
        const createdEvents = await Event.create({id, price, stock, eventimage: eventimage.url, category, rating, review, eventname, orgname, place, eventdate})

        return res.json({created: createdEvents.dataValues})

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createEvent
}