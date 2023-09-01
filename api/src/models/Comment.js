const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define("comment", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: true
    })
}