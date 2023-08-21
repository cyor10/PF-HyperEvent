const {Event} = require('../db')
const cloudinary = require("../utils/cloudinaryConfig")

async function createEvent(req, res) {
    try {
        const { 
            event_name, 
            stock, 
            rating, 
            review,  
            org_name, 
            place_name, 
            adress, 
            city ,
            province, 
            postal, 
            country, 
            start_at, 
            end_at, 
            description, 
            intro , 
            social_media } = req.body

        const imgFile = req.file
        console.log(imgFile)
        const bufferString = Buffer.from(imgFile.buffer).toString('base64')
        const imgToCloud = "data:" + imgFile.mimetype + ";base64," + bufferString;

        if(!event_name || !stock  ) return res.status(404).json({error: 'Name and tickets is required.'})
        const event_image = await cloudinary.uploader.upload(imgToCloud, { public_id: imgFile.originalname })
        const createdEvents = await Event.create({ 
            event_name, 
            stock, 
            event_image: event_image.url,
            rating, 
            review,  
            org_name, 
            place_name, 
            adress, 
            city, 
            province, 
            postal, 
            country, 
            start_at, 
            end_at, 
            description, 
            intro, 
            social_media })
        console.log("Event created succesfully")
        return res.status(200).json({created: createdEvents.dataValues})

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createEvent
}