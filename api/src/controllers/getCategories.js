const axios = require('axios')
const { API_KEY, API_URL } = process.env
const { Category } = require('../db');

async function getCategories(req, res) {
    try {
       /*  const { data } = await axios.get(`${API_URL}/taxonomies?client_id=${API_KEY}`)
        const filteredTaxonomies = data?.taxonomies.filter(obj => {
            return obj.is_visible === true;
        });

        const saveCategories = filteredTaxonomies.map(async tax => {
            await Category.findOrCreate({
                where: { name: tax.name, image: tax.images["500_700"] || "https://seatgeek.com/images/performers-landscape/generic-club-passes-3c1159/677148/500_700.jpg"} 
            })
        });

        await Promise.all(saveCategories); */

        const totalCategories = await Category.findAll({
            order: [['name', 'ASC']] // Order by name in ascending order
        });
        res.status(200).json(totalCategories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = getCategories