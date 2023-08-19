require('dotenv').config()
const { API_KEY, API_URL } = process.env
const axios = require('axios')
const {Event} = require('../db')

async function getEvents(req, res) {
    try {
        const {data} = await axios.get(`${API_URL}/events?client_id=${API_KEY}`)
        if(!data) return res.status(400).json('que paso locooo')

        return res.json({events: data.events})
    } catch (error) {
        console.log(error)
    }
}


module.exports = getEvents