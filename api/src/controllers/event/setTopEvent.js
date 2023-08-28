const { Event } = require('../../db')

async function setTopEvent(req, res) {
    try {
        const eventId = req.params.id;
        const { topEvent } = req.body;

        const event = await Event.findByPk(eventId);

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        if (!topEvent) return res.status(404).json({ error: 'Missing properties: topEvent' })

        event.top_event = topEvent;
        await event.save();

        return res.status(200).json({ updateEvent: eventId });

    } catch (error) {
        return res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = setTopEvent