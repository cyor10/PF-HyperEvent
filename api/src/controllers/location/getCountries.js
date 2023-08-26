const { Countries } = require('../../db');

async function getCountries(req, res) {
    try {
        const totalCountries = await Countries.findAll({
            order: [['name', 'ASC']] // Order by name in ascending order
        });
        res.status(200).json(totalCountries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = getCountries