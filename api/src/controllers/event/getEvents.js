const { Event } = require("../../db");

async function getEvents(req, res) {
  const { name, page } = req.query;
  try {
    await Event.update(
      { location: { lat: 33.8014, lon: -78.7419 } },
      { where: { location: null } }
    )

    if (name) {
      const event = await Event.findOne({ where: { event_name: name } })

      if (!event) return res.status(404).json({ message: 'Event with that name no found' })
      return res.status(200).json(event.dataValues)
    }

    if (page) {
      const elementsPerPage = 15
      const offset = (page - 1) * elementsPerPage;

      const { count, rows } = await Event.findAndCountAll({
        offset,
        limit: elementsPerPage,
        order: [['created', 'DESC']]
      });

      const totalPages = Math.ceil(count / elementsPerPage);

      if (page > totalPages) {
        return res.status(400).json({ error: "Page not found" })
      }
      return res.status(200).json({
        currentPage: +page,
        totalPages,
        events: rows,
      });
    }

    const allEvents = await Event.findAll({
      order: [['created', 'DESC']]
    }
    );
    return res.status(200).json({ events: allEvents })
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = getEvents