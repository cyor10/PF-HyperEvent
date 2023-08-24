const { DataTypes } = require("sequelize")
const Countries = require('./Countries');

module.exports = (sequelize) => {
    sequelize.define("states", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    })
}