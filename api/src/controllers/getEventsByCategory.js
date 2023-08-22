const {Event, Category} = require('../db')

async function getEventsByCategory(req, res) {
    try {
        const {name} = req.query
        console.log(name)
        const eventsbyCategory = await Category.findOne({
            where:{
                name: name
            },
            include:[
                {
                    model: Event,     
                }
            ]
        })
        return res.json(eventsbyCategory.dataValues)
    } catch (error) {
        console.log(error)
        res.status(404).json({error: error})
    }
}

module.exports = {
    getEventsByCategory
}