const { Event, Category, Countries, States, Cities } = require('../../db')
const cloudinary = require('../../utils/cloudinaryConfig')

async function createEvent(req, res) {
    try {
        const {
            event_name,
            org_name,
            category,
            location,
            place_name,
            address,
            city,
            state,
            country,
            postal,
            start_at,
            end_at,
            intro,
            description,
            social_media,
            price,
            stock
        } = req.body

        const imgFile = req.file
        const bufferString = Buffer.from(imgFile.buffer).toString('base64')
        const imgToCloud = "data:" + imgFile.mimetype + ";base64," + bufferString;

        if (!event_name || !country || !city || !stock) return res.status(404).json({ error: 'Incomplete data' })
        const event_image = await cloudinary.uploader.upload(imgToCloud, { public_id: imgFile.originalname })

        const countryExist = await Countries.findOne({ where: { name: country } });

        if (!countryExist) {
            return res.status(404).json({ error: 'Country not found' });
        }

        const stateExist = await States.findOne({ where: { name: state } });

        if (!stateExist) {
            return res.status(404).json({ error: 'State not found' });
        }

        const cityExist = await States.findOne({ where: { name: city } });

        if (!cityExist) {
            return res.status(404).json({ error: 'City not found' });
        }

        const categoryExist = await Category.findOne({ where: { name: category } });

        if (!categoryExist) {
            return res.status(404).json({ error: 'Category not found' });
        }

        const createdEvents = await Event.create({
            event_name,
            org_name,
            category,
            location,
            place_name,
            address,
            city,
            state: stateExist.iso,
            country: countryExist.iso,
            postal,
            start_at,
            end_at,
            intro,
            description,
            social_media,
            event_image: event_image.url,
            price,
            stock,
            created: true,
            category_id: categoryExist.id
        });

        console.log("Event created succesfully")
        return res.status(200).json({ created: createdEvents.dataValues })
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = {
    createEvent
}