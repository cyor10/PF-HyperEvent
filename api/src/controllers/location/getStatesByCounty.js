const { Countries, States } = require('../../db');

async function getStates(req, res) {
    const countryName = req.query.country;
    try {
        const country = await Countries.findOne({
            where: { name: countryName }
        });

        if (!country) {
            return res.status(400).json({ error: 'Country not found' });
        }

        const states = await States.findAll({ where: { country_id: country.id }, order: [['name', 'ASC']] });

        const totalStates = await states.map((state) => {
            return {
                id: state.id,
                name: state.name
            }
        });

        res.status(200).json(totalStates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = getStates