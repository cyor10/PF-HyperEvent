const { Event } = require("../../db");
const { Op } = require('sequelize');

const eventsPerPage = 15;
let shownEventIds = new Set();

async function getEvents(req, res) {
  const { name, page } = req.query;

  try {
    await Event.update(
      { location: { lat: 33.8014, lon: -78.7419 } },
      { where: { location: null } }
    )

    if (name) {
      const event = await Event.findOne({ where: { event_name: name, active: true } })
      if (!event) return res.status(404).json({ message: 'Event with that name not found' })
      return res.status(200).json({ events: event })
    }

    if (page) {
      const offset = (page - 1) * eventsPerPage;

      const whereClause = {
        active: true,
        id: { [Op.notIn]: shownEventIds },
      };

      const { count, rows } = await Event.findAndCountAll({
        offset,
        limit: eventsPerPage,
        where: whereClause,
        order: [['created', 'DESC']]
      });
      const totalPages = Math.ceil(count / eventsPerPage);
      if (page > totalPages) {
        return res.status(400).json({ error: "Page not found" })
      }

      rows.forEach(event => shownEventIds.add(event.id));

      return res.status(200).json({
        currentPage: +page,
        totalPages,
        events: rows,
      });
    }

    return res.status(400).json({ error: "Params is required: name or page" })
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = getEvents