const { States, Cities } = require('../db');

async function getCities(req, res) {
    const stateName = req.query.state;
    try {
        const state = await States.findOne({
            where: { name: stateName }
        });

        if (!state) {
            return res.status(400).json({ error: ' State not found' });
        }

        const cities = await Cities.findAll({ where: {state_id: state.id }, order: [['name', 'ASC']] });

        const totalCities= await cities.map((city) => {
            return {
                id: city.id,
                name: city.name
            }
        });

        res.status(200).json(totalCities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = getCities