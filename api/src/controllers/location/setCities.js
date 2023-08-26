const fs = require('fs');
const path = require('path');
const { States, Cities } = require('../../db');

const batchSize = 100; // Tamaño del lote a procesar

async function readCities(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(content);

        for (let i = 0; i < data.length; i += batchSize) {
            const batch = data.slice(i, i + batchSize);
            await processBatch(batch);
        }
    } catch (error) {
        return { error: error.message };
    }
}

async function processBatch(batch) {
    const stateNames = batch.map(item => item.state);
    const stateRecords = await States.findAll({ where: { name: stateNames } });
    const stateMap = new Map(stateRecords.map(record => [record.name, record]));

    const cityPromises = batch.map(async item => {
        const stateRecord = stateMap.get(item.state);

        if (stateRecord) {
            await Cities.findOrCreate({
                where: { name: item.name, state_id: stateRecord.id }
            });
        }
    });

    await Promise.all(cityPromises);
}

async function setCities(req, res) {
    try {
        const filePath = path.join(__dirname, '../../utils/cities.json')
        await readCities(filePath);
        res.status(200).json({ message: "Cities saved and relationship successfully" })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = setCities