const {Events} = require('../db')

async function createEvent(req, res) {
    try {
        const {id, name, tickets} = req.body
        if(!id || !name || !tickets) return res.status(404).json({error: 'Id, name and tickets is required.'})

        const createdEvents = await Events.create({id, name, tickets})

        return res.json({events: createdEvents.dataValues})

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createEvent
}