const fs = require('fs');
const path = require('path');
const { Countries } = require('../../db')

async function readCountries(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(content)

        for (const country of data) {
            await Countries.findOrCreate({
                where: {
                    name: country.name
                }, 
                defaults: {
                    iso: country.iso2
                }
            });
        }
    } catch (error) {
        return { error: error.message }
    }
}

async function setCountries(req, res) {
    try {
        const filePath = path.join(__dirname, '../../utils/countries.json')
        await readCountries(filePath);
        res.status(200).json("Countries saved successfully")
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = setCountries