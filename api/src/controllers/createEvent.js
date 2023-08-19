const {Event} = require('../db')
const cloudinary = require("../utils/cloudinaryConfig")
const { v4: uuidv4 } = require('uuid');

async function createEvent(req, res) {
    const id = uuidv4();
    try {
        const { stock, category, rating, review, event_name, org_name, place_name, adress, city , province, postal, country, start_at, end_at, description, intro , socialMedia} = req.body
        const imgFile = req.file
        const bufferString = Buffer.from(imgFile.buffer).toString('base64')
        const imgToCloud = "data:" + imgFile.mimetype + ";base64," + bufferString;
        if(!id || !price || !stock || !category || !rating || !review || !event_name || !org_name || !place_name || !imgFile || !start_at || !end_at || !description || !intro ) return res.status(404).json({error: 'Id, name and tickets is required.'})
        const event_image = await cloudinary.uploader.upload(imgToCloud, { public_id: imgFile.originalname })
        const createdEvents = await Event.create({id, price, stock, eventImage: event_image.url, category, rating, review, event_name, org_name, place_name, adress, city , province, postal, country, start_at, end_at, description, intro , socialMedia})

        return res.json({created: createdEvents.dataValues})

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createEvent
}