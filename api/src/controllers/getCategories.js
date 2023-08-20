const axios = require('axios')
const { API_KEY, API_URL } = process.env
const { Category } = require('../db');

async function getCategories(req, res) {
    try {
        const { data } = await axios.get(`${API_URL}/taxonomies?client_id=${API_KEY}`)
        const filteredTaxonomies = data?.taxonomies.filter(obj => {
            return obj.is_visible === true;
        });

        const saveCategories = filteredTaxonomies.map(async tax => {
            await Category.findOrCreate({
                where: { name: tax.name, image: tax.images["500_700"] || "https://s.france24.com/media/display/6aca8d1a-7783-11ea-9cf2-005056bf87d6/w:980/p:16x9/WEB%2005ABR%20DEPORTES%20PORTADA%20FOTO.webp"} 
            })
        });

        await Promise.all(saveCategories);

        const totalCategories = await Category.findAll({
            order: [['id', 'ASC']] // Order by ID in ascending order
        });
        res.status(200).json(totalCategories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = getCategories