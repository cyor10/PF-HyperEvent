const { Event } = require("../../db");

async function getEvents(req, res) {
  const { name } = req.query;
  try {
    if (name) {
      const event = await Event.findOne({ where: { event_name: name } })

      if (!event) return res.status(404).json({ message: 'Event with that name no found' })
      return res.status(200).json(event.dataValues)
    } else {
      const topEvents = await Event.findAll({
        where: { top_event: true }
      })

      const dbEvents = await Event.findAll({
        order: [['created', 'DESC']]}
      );

      const allEvents = [...dbEvents];

      return res.status(200).json({ topEvents: topEvents, events: allEvents });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = getEvents;
