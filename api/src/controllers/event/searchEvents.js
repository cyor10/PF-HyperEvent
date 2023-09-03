const { Event, Category } = require("../../db");
const { Op } = require('sequelize');

async function searchEvents(req, res) {
    const { word, city, start, category, sort, date } = req.query;
    try {
        const whereClause = {};

        if (word) {
            whereClause.event_name = {
                [Op.iLike]: `%${word}%`, // Search case-insensitive
            };
        }

        if (city) {
            whereClause.city = {
                [Op.iLike]: `%${city}%`,
            };
        }

        if (start) {
            const today = new Date();
            const tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);

            if (start === 'today') {
                whereClause.start_at = {
                    [Op.between]: [today, tomorrow],
                };
            } else if (start === 'tomorrow') {
                const dayAfterTomorrow = new Date();
                dayAfterTomorrow.setDate(today.getDate() + 2);
                whereClause.start_at = {
                    [Op.between]: [tomorrow, dayAfterTomorrow],
                };
            } else if (start === 'weekend') {
                const nextWeekend = new Date();
                nextWeekend.setDate(today.getDate() + (6 - today.getDay()) + 1); // Calculate next weekend
                const endOfWeekend = new Date(nextWeekend);
                endOfWeekend.setDate(nextWeekend.getDate() + 2); // The weekend lasts 3 days
                whereClause.start_at = {
                    [Op.between]: [nextWeekend, endOfWeekend],
                };
            }
        }

        if (category) {
            const categoryName = await Category.findOne({
                where: {
                    name: category
                }
            });

            const categoryId = categoryName.id
            whereClause.category_id = categoryId;
        }

        const orderClause = [];

        if (sort === 'asc') {
            orderClause.push(['event_name', 'ASC'])
        } else if (sort === 'desc') {
            orderClause.push(['event_name', 'DESC'])
        }

        if (date === 'newer') {
            orderClause.push(['start_at', 'ASC'])
        } else if (date === 'latest') {
            orderClause.push(['start_at', 'DESC'])
        }

        if (!word && !city && !start && !category) {
            return res.status(400).json({ error: "Params is required" })
        }

        const events = await Event.findAll({
            where: whereClause,
            order: orderClause
        });

        return res.status(200).json(events);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = searchEvents