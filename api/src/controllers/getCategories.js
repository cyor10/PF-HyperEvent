const axios = require('axios')
const { API_KEY, API_URL } = process.env
const { Category } = require('../db');

async function getCategories(req, res) {
    try {
        const { data } = await axios.get(`${API_URL}/taxonomies?client_id=${API_KEY}`)
        const filteredTaxonomies = data?.taxonomies.filter(obj => {
            return obj.parent_id === null && obj.is_visible === true;
        })

        const saveCategories = filteredTaxonomies.map(async tax => {
            await Category.findOrCreate({
                where: { name: tax.name }
            })
        })

        await Promise.all(saveCategories)

        const totalCategories = await Category.findAll()

        const sortCategories = totalCategories.sort((a, b) => a.name.localeCompare(b.name))
        res.status(200).json(sortCategories)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = getCategories