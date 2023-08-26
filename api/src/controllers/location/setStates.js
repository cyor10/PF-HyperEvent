const fs = require('fs');
const path = require('path');
const { Countries, States } = require('../../db');

async function readStates(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(content)

        for (const item of data) {
            const { name, country, iso } = item;

            const countryRecord = await Countries.findOne({ where: { name: country } });

            if (countryRecord) {
                await States.findOrCreate({
                    where: { name: name, country_id: countryRecord.id },
                    defaults: {
                        iso: iso
                    }
                });
            }
        }
    } catch (error) {
        return { error: error.message }
    }
}

async function setStates(req, res) {
    try {
        const filePath = path.join(__dirname, '../../utils/states.json')
        await readStates(filePath);
        res.status(200).json({ message: "States saved and relationship successfully" })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = setStates