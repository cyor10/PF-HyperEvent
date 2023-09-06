require('dotenv').config()
const axios = require("axios");
const { API_KEY, API_URL } = process.env;
const { Category } = require('../../db')

async function setCategories(req, res) {
    try {
        const { data } = await axios.get(`${API_URL}/taxonomies?client_id=${API_KEY}`)
        const filteredTaxonomies = data?.taxonomies.filter(obj => {
            return obj.parent_id === null && obj.is_visible === true;
        });

        await Category.findOrCreate({
            where: { name: "Entertainment" },
            defaults: {
                name: "Entertainment",
                image: "https://seatgeek.com/images/performers-landscape/generic-club-passes-3c1159/677148/500_700.jpg"
            }
        });

        const saveCategories = filteredTaxonomies.map(async tax => {
            await Category.findOrCreate({
                where: { name: tax.name, image: tax.images["500_700"] || "https://seatgeek.com/images/performers-landscape/generic-club-passes-3c1159/677148/500_700.jpg" }
            })
        });

        await Promise.all(saveCategories);

        return res.status(200).json({ message: "Categories saved successfully" })
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = setCategories