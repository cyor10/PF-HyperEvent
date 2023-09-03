const { Event } = require("../../db");

async function getTopEvents(req, res) {
    try {
        const topEvents = await Event.findAll({
            where: { top_event: true },
            order: [['event_name', 'DESC']]
        })

        return res.status(200).json({ topEvents: topEvents })
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = getTopEvents