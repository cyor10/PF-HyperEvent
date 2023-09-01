const axios = require("axios");
require('dotenv').config()
const { API_KEY, API_URL } = process.env;
const { Event, Category } = require('../../db')
const sequelize = require('sequelize');

async function createMasiveEvents(req, res) {
    try {
        const allResponse = [];
        const numPages = 40; // Total number of pages

        // Create an array of promises for fetching events
        const fetchPromises = [];
        for (let page = 1; page <= numPages; page++) {
            const fetchPromise = axios.get(`${API_URL}/events?per_page=25&page=${page}&client_id=${API_KEY}`);
            fetchPromises.push(fetchPromise);
        }

        // Fetch events concurrently and concatenate responses
        const responses = await Promise.all(fetchPromises);
        responses.forEach(response => {
            allResponse.push(...response.data.events);
        });

        for (const element of allResponse) {
            let categoryId = null;

            if (element.performers && element.performers.length > 0 && element.performers[0].taxonomies) {
                const taxonomyName = element.performers[0].taxonomies[0]?.name;

                const category = await Category.findOne({
                    where: sequelize.where(sequelize.fn('lower', sequelize.col('name')), taxonomyName)
                });

                if (category) {
                    categoryId = category.id;
                } else {
                    // If no matching category is found, use the "Mixed" category
                    const mixedCategory = await Category.findOne({ where: { name: "Mixed" } });
                    if (mixedCategory) {
                        categoryId = mixedCategory.id;
                    }
                }
            }

            function generateRandomFutureDate() {
                const currentDate = new Date();
                const maxYearDistance = 1;
                const maxMillisecondsInYear = 31536000000; // 1 año en milisegundos

                const maxDate = new Date(currentDate.getTime() + maxMillisecondsInYear);
                const randomTime = Math.random() * (maxDate.getTime() - currentDate.getTime()) + currentDate.getTime();

                return new Date(randomTime);
            }

            const eventsBoilerPlate = {
                event_name: element.performers[0].name,
                event_image: element?.performers[0].image || "https://seatgeek.com/images/performers-landscape/burning-man-116fb0/11020/21982/huge.jpg",
                location: element.venue.location,
                place_name: element.venue.extended_address,
                address: element.venue.address,
                city: element.venue.city,
                country: element.venue.country,
                start_at: generateRandomFutureDate(),
                postal: element.venue.postal_code,
                price: parseFloat((Math.random() * (1000 - 1) + 1).toFixed(2)),
                stock: parseInt((Math.random() * (2000 - 1) + 1)),
                rating: element.venue.score,
                category_id: categoryId
            };
            const event = await Event.create(eventsBoilerPlate);
        }

        return res.status(200).json({ message: "Events saved successfully" })
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = createMasiveEvents