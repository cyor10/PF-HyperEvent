const { Event } = require("../../db");

async function getEvents(req, res) {
  const { name, page } = req.query;
  try {
    let whereClause = { active: true }; // Filtrar por active:true por defecto

    // Si se proporciona un nombre, agregar el filtro por nombre
    if (name) {
      whereClause.event_name = name;
    }

    // Actualizar los eventos con ubicación nula a una ubicación predeterminada
    await Event.update(
      { location: { lat: 33.8014, lon: -78.7419 } },
      { where: { location: null } }
    );

    const elementsPerPage = 15;
    let offset = 0;

    // Si se proporciona una página, calcular el offset
    if (page) {
      offset = (page - 1) * elementsPerPage;
    }

    const { count, rows } = await Event.findAndCountAll({
      where: whereClause, // Aplicar el filtro de active:true o event_name
      offset,
      limit: elementsPerPage,
      order: [["created", "DESC"]],
    });

    const totalPages = Math.ceil(count / elementsPerPage);

    if (page && page > totalPages) {
      return res.status(400).json({ error: "Page not found" });
    }

    return res.status(200).json({
      currentPage: +page || 1, // Página actual predeterminada a 1 si no se proporciona
      totalPages,
      events: rows,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = getEvents;