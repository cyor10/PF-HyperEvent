const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define("category", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
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