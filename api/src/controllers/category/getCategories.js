const { Category, Event } = require('../../db');

async function getCategories(req, res) {
    const { withEvent } = req.query;

    try {
        if (withEvent) {
            const events = await Event.findAll();
        
            const categoryIds = [...new Set(events.map((e) => e.category_id))]

            categoriesWithEvents = await Category.findAll({
                where: {
                    id: categoryIds
                },
                order: [['name', 'ASC']]
            })

        return res.status(200).json(categoriesWithEvents)
        }
        
        const totalCategories = await Category.findAll({
            order: [['name', 'ASC']] // Order by name in ascending order
        });
        res.status(200).json(totalCategories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = getCategories