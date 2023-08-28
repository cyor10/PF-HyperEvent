const { Category } = require('../../db')
const sequelize = require('sequelize');

const regImage = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.(jpg|jpeg|png|gif)$/i;

async function createCategory(req, res) {
    try {
        const {
            name,
            image
        } = req.body

        if (!name || !image) return res.status(404).json({ error: 'Missing properties: name or image' })

        if (!regImage.test(image)) return res.status(404).json({ error: 'Url image is not valid'})

        const categoryExist = await Category.findOne({ where: sequelize.where(sequelize.fn('lower', sequelize.col('name')), name) })

        if (categoryExist) {
            return res.status(404).json({ error: 'Category allready exist' });
        } else {
            const createdCategory = await Category.create({
                name,
                image
            })
            console.log("Category created succesfully")
            return res.status(200).json({ created: createdCategory.dataValues })
        }

    } catch (error) {
        return res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = createCategory