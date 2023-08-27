const { Category } = require('../../db');

async function getCategories(req, res) {
    try {
        const totalCategories = await Category.findAll({
            order: [['name', 'ASC']] // Order by name in ascending order
        });
        res.status(200).json(totalCategories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = getCategories