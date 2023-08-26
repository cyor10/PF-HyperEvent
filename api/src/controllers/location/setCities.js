const fs = require('fs');
const path = require('path');
const { States, Cities} = require('../../db');

async function readCities(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(content)

        for (const item of data) {
            const { name, state } = item;

            const stateRecord = await States.findOne({ where: { name: state } });

            if (stateRecord) {
                await Cities.findOrCreate({
                    where: { name: name, state_id: stateRecord.id }
                });
            } else {
                console.log(`State not found for ${name}`);
            }
        }
    } catch (error) {
        return { error: error.message }
    }
}

async function setCities(req, res) {
    try {
        const filePath = path.join(__dirname, '../../utils/cities.json')
        await readCities(filePath);
        res.status(200).json("Cities saved and relationship successfully")
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = setCities