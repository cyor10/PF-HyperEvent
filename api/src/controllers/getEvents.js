const { Event } = require("../db");

async function getEvents(req, res) {
  const { name } = req.query;
  try {
    if (name) {
      const event = await Event.findOne({ where: { event_name: name } })

      if(!event) return res.status(404).json({message: 'No se encontro un evento con ese nombre'})
      return res.status(200).json(event.dataValues)
    } else {

      const dbEvents = await Event.findAll();

      const allEvents = [...dbEvents];

      return res.json({ events: allEvents });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = getEvents;
