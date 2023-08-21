const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define("category", {
        id: {
            type: DataTypes.INTEGER,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true,
            }
        }
    }, {
        freezeTableName: true,
        timestamps: false
    })
}