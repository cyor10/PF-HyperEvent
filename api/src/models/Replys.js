const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define("replys", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        comment_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: true
    })
}