const { Event, Category } = require('../../db')

async function getEventsByCategory(req, res) {
    try {
        const { name } = req.query

        const category = await Category.findOne({
            where: {
                name: name
            }
        });

        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        const categoryId = category.id;

        const eventsbyCategory = await Event.findAll({
            where: {
                category_id: categoryId
            }
        });
        return res.status(200).json({ events: eventsbyCategory })
    } catch (error) {
        console.log(error)
        res.status(404).json({ error: error })
    }
}

module.exports = {
    getEventsByCategory
}